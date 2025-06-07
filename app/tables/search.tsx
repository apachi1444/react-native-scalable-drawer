import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useDrawer } from '../../package-template/src';

// Mock data for tables (same as home screen but with more entries)
const allTables = [
  {
    id: '1',
    title: 'Customer Database',
    itemCount: 1250,
    createdDate: '2024-01-15',
    lastUpdated: '2024-01-20',
    category: 'Business',
  },
  {
    id: '2',
    title: 'Product Inventory',
    itemCount: 890,
    createdDate: '2024-01-10',
    lastUpdated: '2024-01-19',
    category: 'Inventory',
  },
  {
    id: '3',
    title: 'Employee Records',
    itemCount: 45,
    createdDate: '2024-01-05',
    lastUpdated: '2024-01-18',
    category: 'HR',
  },
  {
    id: '4',
    title: 'Sales Reports',
    itemCount: 320,
    createdDate: '2024-01-12',
    lastUpdated: '2024-01-17',
    category: 'Analytics',
  },
  {
    id: '5',
    title: 'Marketing Campaigns',
    itemCount: 156,
    createdDate: '2024-01-08',
    lastUpdated: '2024-01-16',
    category: 'Marketing',
  },
  {
    id: '6',
    title: 'Financial Records',
    itemCount: 2340,
    createdDate: '2024-01-03',
    lastUpdated: '2024-01-15',
    category: 'Finance',
  },
  {
    id: '7',
    title: 'Project Tasks',
    itemCount: 78,
    createdDate: '2024-01-14',
    lastUpdated: '2024-01-14',
    category: 'Project Management',
  },
  {
    id: '8',
    title: 'Supplier Contacts',
    itemCount: 234,
    createdDate: '2024-01-06',
    lastUpdated: '2024-01-13',
    category: 'Business',
  },
];

interface TableListItemProps {
  table: typeof allTables[0];
  onPress: () => void;
}

const TableListItem: React.FC<TableListItemProps> = ({ table, onPress }) => (
  <TouchableOpacity style={styles.listItem} onPress={onPress}>
    <View style={styles.itemHeader}>
      <View style={styles.itemTitleContainer}>
        <Text style={styles.itemTitle}>{table.title}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{table.category}</Text>
        </View>
      </View>
      <Text style={styles.itemCount}>{table.itemCount.toLocaleString()} items</Text>
    </View>
    
    <View style={styles.itemDates}>
      <Text style={styles.dateText}>Created: {table.createdDate}</Text>
      <Text style={styles.dateText}>Last updated: {table.lastUpdated}</Text>
    </View>
  </TouchableOpacity>
);

export default function SearchScreen() {
  const router = useRouter();
  const { toggle, isOpen } = useDrawer();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTables, setFilteredTables] = useState(allTables);
  const [isSearching, setIsSearching] = useState(false);

  // Sort tables by last updated date (most recent first)
  const sortedTables = [...filteredTables].sort((a, b) => 
    new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
  );

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      setIsSearching(true);
      
      // Simulate search delay
      setTimeout(() => {
        if (searchQuery.trim() === '') {
          setFilteredTables(allTables);
        } else {
          const filtered = allTables.filter(table =>
            table.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            table.category.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setFilteredTables(filtered);
        }
        setIsSearching(false);
      }, 300);
    }, 200);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  const handleTablePress = (tableId: string) => {
    router.push(`/tables/${tableId}`);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search Tables</Text>
        <TouchableOpacity style={styles.menuButton} onPress={toggle}>
          <Text style={styles.menuIcon}>{isOpen ? '✕' : '☰'}</Text>
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by table name or category..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
            placeholderTextColor="#666"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Results Section */}
      <View style={styles.resultsContainer}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsTitle}>
            {searchQuery ? 'Search Results' : 'All Tables'}
          </Text>
          <Text style={styles.resultsCount}>
            {isSearching ? 'Searching...' : `${sortedTables.length} table${sortedTables.length !== 1 ? 's' : ''}`}
          </Text>
        </View>

        {isSearching ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#673AB7" />
            <Text style={styles.loadingText}>Searching tables...</Text>
          </View>
        ) : sortedTables.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyTitle}>No tables found</Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery 
                ? `No tables match "${searchQuery}"`
                : 'No tables available'
              }
            </Text>
            {searchQuery && (
              <TouchableOpacity 
                style={styles.clearSearchButton}
                onPress={() => setSearchQuery('')}
              >
                <Text style={styles.clearSearchText}>Clear search</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <FlatList
            data={sortedTables}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TableListItem
                table={item}
                onPress={() => handleTablePress(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#673AB7',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 20,
    color: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 20,
    color: '#fff',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  clearIcon: {
    fontSize: 16,
    color: '#666',
    padding: 4,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  resultsCount: {
    fontSize: 14,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  clearSearchButton: {
    backgroundColor: '#673AB7',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  clearSearchText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  listContainer: {
    padding: 16,
  },
  listItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  itemTitleContainer: {
    flex: 1,
    marginRight: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  categoryBadge: {
    backgroundColor: '#673AB7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  itemCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#673AB7',
  },
  itemDates: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
  },
});
