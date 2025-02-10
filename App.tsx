import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Provider as PaperProvider, TextInput, Button, Text, Card } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function App() {
  const [apiKey, setApiKey] = useState('');
  const [stock1, setStock1] = useState('');
  const [stock2, setStock2] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const compareStocks = async () => {
    if (!apiKey || !stock1 || !stock2) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // Replace with your backend API endpoint
      const response = await axios.post('YOUR_BACKEND_API_URL', {
        apiKey,
        stock1,
        stock2,
      });
      
      setAnalysis(response.data.analysis);
    } catch (error) {
      console.error(error);
      alert('Error comparing stocks. Please try again.');
    }
    setLoading(false);
  };

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>AI Investment Agent 📈🤖</Text>
            <Text style={styles.caption}>
              Compare the performance of two stocks and generate detailed reports
            </Text>

            <TextInput
              mode="outlined"
              label="OpenAI API Key"
              value={apiKey}
              onChangeText={setApiKey}
              secureTextEntry
              style={styles.input}
            />

            <TextInput
              mode="outlined"
              label="First Stock Symbol"
              value={stock1}
              onChangeText={setStock1}
              style={styles.input}
            />

            <TextInput
              mode="outlined"
              label="Second Stock Symbol"
              value={stock2}
              onChangeText={setStock2}
              style={styles.input}
            />

            <Button
              mode="contained"
              onPress={compareStocks}
              loading={loading}
              style={styles.button}
            >
              Compare Stocks
            </Button>

            {analysis && (
              <Card style={styles.card}>
                <Card.Content>
                  <Text>{analysis}</Text>
                </Card.Content>
              </Card>
            )}
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  caption: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    marginBottom: 24,
  },
  card: {
    marginBottom: 16,
  },
});
