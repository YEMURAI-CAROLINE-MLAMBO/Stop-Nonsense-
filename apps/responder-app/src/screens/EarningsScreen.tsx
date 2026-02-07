import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';

export const EarningsScreen = () => {
  const earnings = [
    { id: '1', date: 'Today', amount: 'R150.00', status: 'Paid' },
    { id: '2', date: 'Yesterday', amount: 'R450.00', status: 'Paid' },
    { id: '3', date: '10 Oct', amount: 'R300.00', status: 'Paid' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Earnings</Text>
        <Text style={styles.total}>Total: R900.00</Text>
      </View>

      <FlatList
        data={earnings}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.itemDate}>{item.date}</Text>
              <Text style={styles.itemStatus}>{item.status}</Text>
            </View>
            <Text style={styles.itemAmount}>{item.amount}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { padding: 30, backgroundColor: '#000' },
  title: { color: '#AAA', fontSize: 14, fontWeight: 'bold' },
  total: { color: '#FFF', fontSize: 32, fontWeight: 'bold', marginTop: 10 },
  list: { padding: 20 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    marginBottom: 10,
  },
  itemDate: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  itemStatus: { color: '#4CAF50', fontSize: 12, marginTop: 4 },
  itemAmount: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});
