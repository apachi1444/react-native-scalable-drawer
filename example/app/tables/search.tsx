import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDrawer } from 'react-native-scaling-drawer';

// Import theme colors
const { useThemeColors } = require('../../hooks/useThemeColors');

// Enhanced mock data with records for deep searching
const allTables = [
  {
    id: '1',
    title: 'Customer Database',
    itemCount: 1250,
    createdDate: '2024-01-15',
    lastUpdated: '2024-01-20',
    category: 'Business',
    records: [
      { id: '1', Name: 'John Doe', Email: 'john@example.com', Phone: '+1234567890', Company: 'Acme Corp', Status: 'Active' },
      { id: '2', Name: 'Jane Smith', Email: 'jane@example.com', Phone: '+1234567891', Company: 'Tech Inc', Status: 'Active' },
      { id: '3', Name: 'Bob Johnson', Email: 'bob@example.com', Phone: '+1234567892', Company: 'StartupXYZ', Status: 'Inactive' },
    ],
  },
  {
    id: '2',
    title: 'Product Inventory',
    itemCount: 890,
    createdDate: '2024-01-10',
    lastUpdated: '2024-01-19',
    category: 'Inventory',
    records: [
      { id: '1', Product: 'iPhone 15', SKU: 'IPH15-128', Price: '$799', Stock: '45', Category: 'Electronics' },
      { id: '2', Product: 'MacBook Pro', SKU: 'MBP-M3-14', Price: '$1999', Stock: '12', Category: 'Computers' },
      { id: '3', Product: 'AirPods Pro', SKU: 'APP-GEN2', Price: '$249', Stock: '78', Category: 'Audio' },
    ],
  },
  {
    id: '3',
    title: 'Employee Records',
    itemCount: 45,
    createdDate: '2024-01-05',
    lastUpdated: '2024-01-18',
    category: 'HR',
    records: [
      { id: '1', Name: 'Alice Brown', Department: 'Engineering', Position: 'Senior Developer', Salary: '$95000', StartDate: '2022-03-15' },
      { id: '2', Name: 'Charlie Wilson', Department: 'Marketing', Position: 'Marketing Manager', Salary: '$75000', StartDate: '2023-01-10' },
      { id: '3', Name: 'Diana Lee', Department: 'Sales', Position: 'Sales Representative', Salary: '$65000', StartDate: '2023-06-01' },
    ],
  },
  {
    id: '4',
    title: 'Sales Reports',
    itemCount: 320,
    createdDate: '2024-01-12',
    lastUpdated: '2024-01-17',
    category: 'Analytics',
    records: [
      { id: '1', Month: 'January 2024', Revenue: '$125000', Orders: '450', Growth: '+12%', Region: 'North America' },
      { id: '2', Month: 'December 2023', Revenue: '$118000', Orders: '420', Growth: '+8%', Region: 'North America' },
      { id: '3', Month: 'November 2023', Revenue: '$109000', Orders: '380', Growth: '+5%', Region: 'North America' },
    ],
  },
  {
    id: '5',
    title: 'Marketing Campaigns',
    itemCount: 156,
    createdDate: '2024-01-08',
    lastUpdated: '2024-01-16',
    category: 'Marketing',
    records: [
      { id: '1', Campaign: 'Summer Sale 2024', Budget: '$50000', Clicks: '125000', Conversions: '2500', ROI: '4.2x' },
      { id: '2', Campaign: 'Black Friday 2023', Budget: '$75000', Clicks: '200000', Conversions: '4200', ROI: '5.8x' },
      { id: '3', Campaign: 'Spring Launch', Budget: '$30000', Clicks: '80000', Conversions: '1200', ROI: '3.1x' },
    ],
  },
  {
    id: '6',
    title: 'Financial Records',
    itemCount: 2340,
    createdDate: '2024-01-03',
    lastUpdated: '2024-01-15',
    category: 'Finance',
    records: [
      { id: '1', Transaction: 'Office Rent', Amount: '$8500', Date: '2024-01-01', Category: 'Expense', Status: 'Paid' },
      { id: '2', Transaction: 'Client Payment - Acme Corp', Amount: '$25000', Date: '2024-01-02', Category: 'Income', Status: 'Received' },
      { id: '3', Transaction: 'Software Licenses', Amount: '$1200', Date: '2024-01-03', Category: 'Expense', Status: 'Paid' },
    ],
  },
  {
    id: '7',
    title: 'Project Tasks',
    itemCount: 78,
    createdDate: '2024-01-14',
    lastUpdated: '2024-01-14',
    category: 'Project Management',
    records: [
      { id: '1', Task: 'Design Homepage', Assignee: 'John Doe', Status: 'In Progress', Priority: 'High', DueDate: '2024-01-25' },
      { id: '2', Task: 'Setup Database', Assignee: 'Alice Brown', Status: 'Completed', Priority: 'High', DueDate: '2024-01-20' },
      { id: '3', Task: 'Write Documentation', Assignee: 'Bob Johnson', Status: 'Pending', Priority: 'Medium', DueDate: '2024-01-30' },
    ],
  },
  {
    id: '8',
    title: 'Supplier Contacts',
    itemCount: 234,
    createdDate: '2024-01-06',
    lastUpdated: '2024-01-13',
    category: 'Business',
    records: [
      { id: '1', Company: 'Global Tech Supplies', Contact: 'Mike Chen', Email: 'mike@globaltech.com', Phone: '+1555123456', Category: 'Electronics' },
      { id: '2', Company: 'Office Solutions Inc', Contact: 'Sarah Davis', Email: 'sarah@officesolutions.com', Phone: '+1555234567', Category: 'Office Supplies' },
      { id: '3', Company: 'Green Energy Co', Contact: 'Tom Wilson', Email: 'tom@greenenergy.com', Phone: '+1555345678', Category: 'Utilities' },
    ],
  },
];

interface TableListItemProps {
  table: any;
  onPress: () => void;
  searchQuery: string;
}

const TableListItem: React.FC<TableListItemProps> = ({ table, onPress, searchQuery }) => {
  const colors = useThemeColors();

  const dynamicStyles = StyleSheet.create({
    listItem: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: colors.textPrimary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
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
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.textPrimary,
      marginBottom: 8,
    },
    categoryBadge: {
      backgroundColor: colors.primary,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 8,
      alignSelf: 'flex-start',
    },
    categoryText: {
      fontSize: 12,
      color: colors.onPrimary,
      fontWeight: '600',
    },
    itemCount: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.primary,
    },
    matchInfo: {
      backgroundColor: colors.highlight,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      marginBottom: 12,
    },
    matchText: {
      fontSize: 14,
      color: colors.primary,
      fontWeight: '600',
    },
    itemDates: {
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dateText: {
      fontSize: 12,
      color: colors.textSecondary,
    },
  });

  return (
    <TouchableOpacity style={dynamicStyles.listItem} onPress={onPress}>
      <View style={dynamicStyles.itemHeader}>
        <View style={dynamicStyles.itemTitleContainer}>
          <Text style={dynamicStyles.itemTitle}>{table.title}</Text>
          <View style={dynamicStyles.categoryBadge}>
            <Text style={dynamicStyles.categoryText}>{table.category}</Text>
          </View>
        </View>
        <Text style={dynamicStyles.itemCount}>{table.itemCount.toLocaleString()} items</Text>
      </View>

      {/* Show match information */}
      {table.matchType === 'record' && table.matchCount > 0 && (
        <View style={dynamicStyles.matchInfo}>
          <Text style={dynamicStyles.matchText}>
            🔍 {table.matchCount} record{table.matchCount !== 1 ? 's' : ''} match "{searchQuery}"
          </Text>
        </View>
      )}

      <View style={dynamicStyles.itemDates}>
        <Text style={dynamicStyles.dateText}>Created: {table.createdDate}</Text>
        <Text style={dynamicStyles.dateText}>Last updated: {table.lastUpdated}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function SearchScreen() {
  const router = useRouter();
  const { toggle, isOpen } = useDrawer();
  const colors = useThemeColors();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      setIsSearching(true);

      // Simulate search delay
      setTimeout(() => {
        if (searchQuery.trim() === '') {
          setFilteredResults([]);
        } else {
          const results: any[] = [];
          const query = searchQuery.toLowerCase();

          // Search through tables and their records
          allTables.forEach(table => {
            // Check if table title or category matches
            const tableMatches =
              table.title.toLowerCase().includes(query) ||
              table.category.toLowerCase().includes(query);

            // Check if any record in the table matches
            const matchingRecords = table.records?.filter(record =>
              Object.values(record).some(value =>
                value?.toString().toLowerCase().includes(query)
              )
            ) || [];

            if (tableMatches || matchingRecords.length > 0) {
              results.push({
                ...table,
                matchType: tableMatches ? 'table' : 'record',
                matchingRecords: matchingRecords,
                matchCount: matchingRecords.length,
              });
            }
          });

          // Sort by relevance: table matches first, then by match count
          results.sort((a, b) => {
            if (a.matchType === 'table' && b.matchType === 'record') return -1;
            if (a.matchType === 'record' && b.matchType === 'table') return 1;
            if (a.matchType === 'record' && b.matchType === 'record') {
              return b.matchCount - a.matchCount;
            }
            return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
          });

          setFilteredResults(results);
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

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      backgroundColor: colors.primary,
      elevation: 4,
      shadowColor: colors.textPrimary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    backButton: {
      padding: 8,
    },
    backIcon: {
      fontSize: 20,
      color: colors.onPrimary,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.onPrimary,
    },
    menuButton: {
      padding: 8,
    },
    menuIcon: {
      fontSize: 20,
      color: colors.onPrimary,
    },
    searchContainer: {
      padding: 16,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    searchInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: colors.textPrimary,
    },
    clearIcon: {
      fontSize: 16,
      color: colors.textSecondary,
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
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    resultsTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.textPrimary,
    },
    resultsCount: {
      fontSize: 14,
      color: colors.textSecondary,
    },
  });

  return (
    <SafeAreaView style={dynamicStyles.container}>
      {/* Custom Header */}
      <View style={dynamicStyles.header}>
        <TouchableOpacity style={dynamicStyles.backButton} onPress={handleBack}>
          <Text style={dynamicStyles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={dynamicStyles.headerTitle}>Search Tables</Text>
        <TouchableOpacity style={dynamicStyles.menuButton} onPress={toggle}>
          <Text style={dynamicStyles.menuIcon}>{isOpen ? '✕' : '☰'}</Text>
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View style={dynamicStyles.searchContainer}>
        <View style={dynamicStyles.searchInputContainer}>
          <Text style={{ fontSize: 16, marginRight: 12, color: colors.textSecondary }}>🔍</Text>
          <TextInput
            style={dynamicStyles.searchInput}
            placeholder="Search tables, records, or any content..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
            placeholderTextColor={colors.textSecondary}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={dynamicStyles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Results Section */}
      <View style={dynamicStyles.resultsContainer}>
        <View style={dynamicStyles.resultsHeader}>
          <Text style={dynamicStyles.resultsTitle}>
            {searchQuery ? 'Search Results' : 'Start typing to search...'}
          </Text>
          <Text style={dynamicStyles.resultsCount}>
            {isSearching ? 'Searching...' : searchQuery ? `${filteredResults.length} result${filteredResults.length !== 1 ? 's' : ''}` : ''}
          </Text>
        </View>

        {!searchQuery ? (
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 40
          }}>
            <Text style={{ fontSize: 64, marginBottom: 20 }}>🔍</Text>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: colors.textPrimary,
              marginBottom: 8,
              textAlign: 'center'
            }}>
              Deep Search
            </Text>
            <Text style={{
              fontSize: 16,
              color: colors.textSecondary,
              textAlign: 'center',
              lineHeight: 24
            }}>
              Search through table names, categories,{'\n'}and even individual records
            </Text>
          </View>
        ) : isSearching ? (
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 40
          }}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={{
              fontSize: 16,
              color: colors.textSecondary,
              marginTop: 16
            }}>
              Searching through tables and records...
            </Text>
          </View>
        ) : filteredResults.length === 0 ? (
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 40
          }}>
            <Text style={{ fontSize: 48, marginBottom: 16 }}>🚫</Text>
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: colors.textPrimary,
              marginBottom: 8
            }}>
              No results found
            </Text>
            <Text style={{
              fontSize: 14,
              color: colors.textSecondary,
              textAlign: 'center',
              marginBottom: 24
            }}>
              No tables or records match "{searchQuery}"
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderRadius: 8,
              }}
              onPress={() => setSearchQuery('')}
            >
              <Text style={{
                color: colors.onPrimary,
                fontSize: 16,
                fontWeight: '600'
              }}>
                Clear search
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={filteredResults}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TableListItem
                table={item}
                onPress={() => handleTablePress(item.id)}
                searchQuery={searchQuery}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 16 }}
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
