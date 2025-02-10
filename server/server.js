const express = require('express');
const cors = require('cors');
const yahooFinance = require('yahoo-finance2').default;
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/compare-stocks', async (req, res) => {
  try {
    const { apiKey, stock1, stock2 } = req.body;

    // Initialize OpenAI
    const openai = new OpenAI({ apiKey });

    // Fetch stock data
    const [stock1Data, stock2Data] = await Promise.all([
      yahooFinance.quote(stock1),
      yahooFinance.quote(stock2)
    ]);

    // Fetch company info
    const [stock1Info, stock2Info] = await Promise.all([
      yahooFinance.quoteSummary(stock1, { modules: ['assetProfile', 'recommendationTrend'] }),
      yahooFinance.quoteSummary(stock2, { modules: ['assetProfile', 'recommendationTrend'] })
    ]);

    // Prepare data for GPT analysis
    const stockData = {
      stock1: {
        symbol: stock1,
        price: stock1Data.regularMarketPrice,
        change: stock1Data.regularMarketChangePercent,
        profile: stock1Info.assetProfile,
        recommendations: stock1Info.recommendationTrend
      },
      stock2: {
        symbol: stock2,
        price: stock2Data.regularMarketPrice,
        change: stock2Data.regularMarketChangePercent,
        profile: stock2Info.assetProfile,
        recommendations: stock2Info.recommendationTrend
      }
    };

    // Generate analysis using GPT-4
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "system",
        content: "You are a financial analyst. Analyze and compare these two stocks based on their current data and provide insights."
      }, {
        role: "user",
        content: JSON.stringify(stockData)
      }]
    });

    res.json({
      analysis: completion.choices[0].message.content,
      stockData
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to analyze stocks' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
