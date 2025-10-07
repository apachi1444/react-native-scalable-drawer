import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDrawer } from '@apachi14444/react-native-scaling-drawer';

const { width: screenWidth } = Dimensions.get('window');

// Mock data for tables
const mockTables = [
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
];

const categories = ['All', 'Business', 'Inventory', 'HR', 'Analytics'];

interface TableCardProps {
  table: typeof mockTables[0];
  onPress: () => void;
}

const TableCard: React.FC<TableCardProps> = ({ table, onPress }) => (
  <TouchableOpacity style={styles.tableCard} onPress={onPress}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardTitle} numberOfLines={2}>
        {table.title}
      </Text>
      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>{table.category}</Text>
      </View>
    </View>
    
    <View style={styles.cardStats}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{table.itemCount.toLocaleString()}</Text>
        <Text style={styles.statLabel}>Items</Text>
      </View>
    </View>
    
    <View style={styles.cardDates}>
      <Text style={styles.dateText}>Created: {table.createdDate}</Text>
      <Text style={styles.dateText}>Updated: {table.lastUpdated}</Text>
    </View>
  </TouchableOpacity>
);

export default function TablesHomeScreen() {
  const router = useRouter();
  const { toggle, isOpen } = useDrawer();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTables = mockTables.filter(table => 
    selectedCategory === 'All' || table.category === selectedCategory
  );

  const handleTablePress = (tableId: string) => {
    router.push(`/tables/${tableId}`);
  };

  const handleSearchPress = () => {
    router.push('/tables/search');
  };

  const handleFilterSelect = (category: string) => {
    setSelectedCategory(category);
    setFilterModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={toggle}>
          <Text style={styles.menuIcon}>{isOpen ? '✕' : '☰'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tables</Text>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => router.push('/tables/create')}
        >
          <Text style={styles.createIcon}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search and Filter Row */}
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchBar} onPress={handleSearchPress}>
            <Text style={styles.searchIcon}>🔍</Text>
            <Text style={styles.searchPlaceholder}>Search tables...</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setFilterModalVisible(true)}
          >
            <Text style={styles.filterIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Section Title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'All' ? 'Recent Tables' : `${selectedCategory} Tables`}
          </Text>
          <Text style={styles.sectionSubtitle}>
            {filteredTables.length} table{filteredTables.length !== 1 ? 's' : ''}
          </Text>
        </View>

        {/* Horizontal Carousel */}
        <FlatList
          data={filteredTables}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.carouselContainer}
          renderItem={({ item }) => (
            <TableCard
              table={item}
              onPress={() => handleTablePress(item.id)}
            />
          )}
        />

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.quickActionsTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/tables/create')}
            >
              <Text style={styles.actionIcon}>➕</Text>
              <Text style={styles.actionLabel}>Create Table</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/tables/search')}
            >
              <Text style={styles.actionIcon}>🔍</Text>
              <Text style={styles.actionLabel}>Search All</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={filterModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter by Category</Text>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={categories}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.categoryOption,
                    selectedCategory === item && styles.selectedCategory
                  ]}
                  onPress={() => handleFilterSelect(item)}
                >
                  <Text style={[
                    styles.categoryOptionText,
                    selectedCategory === item && styles.selectedCategoryText
                  ]}>
                    {item}
                  </Text>
                  {selectedCategory === item && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
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
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 20,
    color: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  createButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createIcon: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: '#666',
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#673AB7',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filterIcon: {
    fontSize: 18,
    color: '#fff',
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  carouselContainer: {
    paddingLeft: 16,
  },
  tableCard: {
    width: screenWidth * 0.75,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginRight: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 12,
  },
  categoryBadge: {
    backgroundColor: '#673AB7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  cardStats: {
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#673AB7',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  cardDates: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  quickActions: {
    padding: 16,
    marginTop: 24,
  },
  quickActionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 34,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalClose: {
    fontSize: 18,
    color: '#666',
    padding: 4,
  },
  categoryOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedCategory: {
    backgroundColor: '#f3e5f5',
  },
  categoryOptionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedCategoryText: {
    color: '#673AB7',
    fontWeight: '500',
  },
  checkmark: {
    fontSize: 16,
    color: '#673AB7',
    fontWeight: 'bold',
  },
});
