import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';

export const HistoryScreen = () => {
  const mockHistory = [
    { id: '1', date: '12 Oct 2023', status: 'Resolved', address: '42 Sandton Dr' },
    { id: '2', date: '05 Sep 2023', status: 'Cancelled', address: '42 Sandton Dr' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Incident History</Text>
      <FlatList
        data={mockHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.itemDate}>{item.date}</Text>
              <Text style={styles.itemAddress}>{item.address}</Text>
            </View>
            <Text style={[styles.itemStatus, item.status === 'Cancelled' && styles.cancelled]}>
              {item.status}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  itemDate: { fontSize: 16, fontWeight: '600' },
  itemAddress: { fontSize: 14, color: '#999', marginTop: 2 },
  itemStatus: { color: '#4CAF50', fontWeight: 'bold' },
  cancelled: { color: '#999' }
});
