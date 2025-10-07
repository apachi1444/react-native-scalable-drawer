import { useThemeColors } from '@/hooks/useThemeColors';
import { useDrawer } from '@apachi14444/react-native-scaling-drawer';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock table data
const mockTableData = {
  '1': {
    id: '1',
    title: 'Customer Database',
    itemCount: 1250,
    createdDate: '2024-01-15',
    lastUpdated: '2024-01-20',
    category: 'Business',
    columns: ['Name', 'Email', 'Phone', 'Company', 'Status'],
    records: [
      { id: '1', Name: 'John Doe', Email: 'john@example.com', Phone: '+1234567890', Company: 'Acme Corp', Status: 'Active' },
      { id: '2', Name: 'Jane Smith', Email: 'jane@example.com', Phone: '+1234567891', Company: 'Tech Inc', Status: 'Active' },
      { id: '3', Name: 'Bob Johnson', Email: 'bob@example.com', Phone: '+1234567892', Company: 'StartupXYZ', Status: 'Inactive' },
      { id: '4', Name: 'Alice Brown', Email: 'alice@example.com', Phone: '+1234567893', Company: 'BigCorp', Status: 'Active' },
      { id: '5', Name: 'Charlie Wilson', Email: 'charlie@example.com', Phone: '+1234567894', Company: 'SmallBiz', Status: 'Pending' },
    ],
  },
  // Add more mock data for other tables...
};

interface RecordRowProps {
  record: any;
  columns: string[];
  onEdit: (recordId: string, field: string, value: string) => void;
  onDelete: (recordId: string) => void;
  onView: (record: any) => void;
}

const RecordRow: React.FC<RecordRowProps> = ({ record, columns, onEdit, onDelete, onView }) => {
  const colors = useThemeColors();
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleEditStart = (field: string, currentValue: string) => {
    setEditingField(field);
    setEditValue(currentValue);
  };

  const handleEditSave = () => {
    if (editingField) {
      onEdit(record.id, editingField, editValue);
      setEditingField(null);
      setEditValue('');
    }
  };

  const handleEditCancel = () => {
    setEditingField(null);
    setEditValue('');
  };

  const dynamicStyles = StyleSheet.create({
    recordRow: {
      backgroundColor: colors.surface,
      borderRadius: 8,
      padding: 12,
      marginBottom: 6,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: colors.textPrimary,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    recordContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    fieldsContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 12,
    },
    fieldItem: {
      flexDirection: 'row',
      alignItems: 'center',
      minWidth: 0,
    },
    fieldLabel: {
      fontSize: 10,
      color: colors.textSecondary,
      fontWeight: '600',
      marginRight: 4,
      textTransform: 'uppercase',
    },
    fieldValue: {
      fontSize: 13,
      color: colors.textPrimary,
      fontWeight: '500',
      flexShrink: 1,
    },
    primaryField: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textPrimary,
    },
    editInput: {
      flex: 1,
      backgroundColor: colors.surface,
      borderWidth: 2,
      borderColor: colors.primary,
      borderRadius: 6,
      padding: 8,
      fontSize: 14,
      color: colors.textPrimary,
      minHeight: 32,
    },
    editContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    saveButton: {
      backgroundColor: colors.secondary,
      padding: 8,
      borderRadius: 6,
      minWidth: 32,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cancelButton: {
      backgroundColor: colors.danger,
      padding: 8,
      borderRadius: 6,
      minWidth: 32,
      alignItems: 'center',
      justifyContent: 'center',
    },
    saveIcon: {
      color: colors.onSecondary,
      fontSize: 16,
      fontWeight: 'bold',
    },
    cancelIcon: {
      color: colors.onDanger,
      fontSize: 16,
      fontWeight: 'bold',
    },
    actionsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginLeft: 12,
    },
    actionButton: {
      padding: 6,
      borderRadius: 6,
      minWidth: 28,
      alignItems: 'center',
      justifyContent: 'center',
    },
    viewButton: {
      backgroundColor: colors.primary,
    },
    deleteButton: {
      backgroundColor: colors.danger,
    },
    actionIcon: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    viewIcon: {
      color: colors.onPrimary,
    },
    deleteIcon: {
      color: colors.onDanger,
    },
    editingRow: {
      backgroundColor: colors.background,
      borderColor: colors.primary,
      borderWidth: 2,
    },
    editActions: {
      flexDirection: 'row',
      gap: 4,
      marginLeft: 8,
    },
  });

  // If editing, show full edit mode
  if (editingField) {
    return (
      <View style={[dynamicStyles.recordRow, dynamicStyles.editingRow]}>
        <View style={dynamicStyles.recordContent}>
          <View style={dynamicStyles.fieldsContainer}>
            <Text style={dynamicStyles.fieldLabel}>{editingField}:</Text>
            <TextInput
              style={dynamicStyles.editInput}
              value={editValue}
              onChangeText={setEditValue}
              autoFocus
              onBlur={handleEditCancel}
              placeholderTextColor={colors.textSecondary}
            />
          </View>
          <View style={dynamicStyles.editActions}>
            <TouchableOpacity style={dynamicStyles.saveButton} onPress={handleEditSave}>
              <Text style={dynamicStyles.saveIcon}>✓</Text>
            </TouchableOpacity>
            <TouchableOpacity style={dynamicStyles.cancelButton} onPress={handleEditCancel}>
              <Text style={dynamicStyles.cancelIcon}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // Normal compact view - show fields horizontally
  return (
    <View style={dynamicStyles.recordRow}>
      <View style={dynamicStyles.recordContent}>
        <View style={dynamicStyles.fieldsContainer}>
          {/* Show first field (usually Name) as primary */}
          {columns[0] && (
            <TouchableOpacity
              style={dynamicStyles.fieldItem}
              onPress={() => handleEditStart(columns[0], record[columns[0]])}
            >
              <Text style={dynamicStyles.primaryField} numberOfLines={1}>
                {record[columns[0]]}
              </Text>
            </TouchableOpacity>
          )}

          {/* Show remaining fields as secondary info */}
          {columns.slice(1, 3).map((column) => (
            <TouchableOpacity
              key={column}
              style={dynamicStyles.fieldItem}
              onPress={() => handleEditStart(column, record[column])}
            >
              <Text style={dynamicStyles.fieldLabel}>{column}:</Text>
              <Text style={dynamicStyles.fieldValue} numberOfLines={1}>
                {record[column]}
              </Text>
            </TouchableOpacity>
          ))}

          {/* Show count of additional fields if there are more */}
          {columns.length > 3 && (
            <TouchableOpacity onPress={() => onView(record)}>
              <Text style={[dynamicStyles.fieldLabel, { color: colors.primary }]}>
                +{columns.length - 3} more
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={dynamicStyles.actionsContainer}>
          <TouchableOpacity
            style={[dynamicStyles.actionButton, dynamicStyles.viewButton]}
            onPress={() => onView(record)}
          >
            <Text style={[dynamicStyles.actionIcon, dynamicStyles.viewIcon]}>👁</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[dynamicStyles.actionButton, dynamicStyles.deleteButton]}
            onPress={() => onDelete(record.id)}
          >
            <Text style={[dynamicStyles.actionIcon, dynamicStyles.deleteIcon]}>🗑</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function TableDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { toggle, isOpen } = useDrawer();
  const colors = useThemeColors();

  const tableId = Array.isArray(id) ? id[0] : id;
  const tableData = mockTableData[tableId as keyof typeof mockTableData];

  const [records, setRecords] = useState(tableData?.records || []);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [addRecordModalVisible, setAddRecordModalVisible] = useState(false);
  const [newRecord, setNewRecord] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecords = useMemo(() => {
    if (!searchQuery.trim()) return records;

    return records.filter(record =>
      tableData.columns.some(column =>
        record[column as keyof typeof record]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [records, searchQuery, tableData?.columns]);

  if (!tableData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Table not found</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleEditRecord = (recordId: string, field: string, value: string) => {
    setRecords(prevRecords =>
      prevRecords.map(record =>
        record.id === recordId ? { ...record, [field]: value } : record
      )
    );
  };

  const handleDeleteRecord = (recordId: string) => {
    Alert.alert(
      'Delete Record',
      'Are you sure you want to delete this record?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setRecords(prevRecords => prevRecords.filter(record => record.id !== recordId));
          },
        },
      ]
    );
  };

  const handleViewRecord = (record: any) => {
    setSelectedRecord(record);
    setViewModalVisible(true);
  };

  const handleAddRecord = () => {
    // Initialize new record with empty values for all columns
    const emptyRecord: any = { id: '' };
    tableData.columns.forEach(column => {
      emptyRecord[column] = '';
    });
    setNewRecord(emptyRecord);
    setAddRecordModalVisible(true);
  };

  const handleSaveNewRecord = () => {
    // Validate that all fields are filled
    const emptyFields = tableData.columns.filter(column => !newRecord[column]?.trim());
    if (emptyFields.length > 0) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Generate new ID
    const maxId = Math.max(...records.map(r => parseInt(r.id) || 0));
    const newId = (maxId + 1).toString();

    // Add the new record
    const recordToAdd = { ...newRecord, id: newId };
    setRecords(prevRecords => [...prevRecords, recordToAdd]);

    // Reset and close modal
    setNewRecord({});
    setAddRecordModalVisible(false);

    Alert.alert('Success', 'Record added successfully!');
  };

  const handleCancelAddRecord = () => {
    setNewRecord({});
    setAddRecordModalVisible(false);
  };

  const updateNewRecordField = (field: string, value: string) => {
    setNewRecord((prev: any) => ({ ...prev, [field]: value }));
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
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.onPrimary,
      flex: 1,
      textAlign: 'center',
      marginHorizontal: 16,
    },
    backButton: {
      padding: 8,
    },
    backIcon: {
      fontSize: 20,
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
      backgroundColor: colors.surface,
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    searchInput: {
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      color: colors.textPrimary,
    },
  });

  return (
    <SafeAreaView style={dynamicStyles.container}>
      {/* Custom Header */}
      <View style={dynamicStyles.header}>
        <TouchableOpacity style={dynamicStyles.backButton} onPress={() => router.back()}>
          <Text style={dynamicStyles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={dynamicStyles.headerTitle} numberOfLines={1}>
          {tableData.title}
        </Text>
        <TouchableOpacity style={dynamicStyles.menuButton} onPress={toggle}>
          <Text style={dynamicStyles.menuIcon}>{isOpen ? '✕' : '☰'}</Text>
        </TouchableOpacity>
      </View>

      {/* Search Section */}
      <View style={dynamicStyles.searchContainer}>
        <TextInput
          style={dynamicStyles.searchInput}
          placeholder="Search records..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={colors.textSecondary}
        />
      </View>

      {/* Table Overview */}
      <View style={styles.overviewContainer}>
        <View style={styles.overviewHeader}>
          <Text style={styles.tableTitle}>{tableData.title}</Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{tableData.category}</Text>
          </View>
        </View>
        
        <View style={styles.overviewStats}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Records</Text>
            <Text style={styles.statValue}>{records.length}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Created</Text>
            <Text style={styles.statValue}>{tableData.createdDate}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Updated</Text>
            <Text style={styles.statValue}>{tableData.lastUpdated}</Text>
          </View>
        </View>
      </View>

      {/* Records List */}
      <View style={styles.recordsContainer}>
        <View style={styles.recordsHeader}>
          <Text style={styles.recordsTitle}>Records</Text>
          <TouchableOpacity style={styles.addButton} onPress={handleAddRecord}>
            <Text style={styles.addIcon}>+</Text>
            <Text style={styles.addText}>Add Record</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredRecords}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RecordRow
              record={item}
              columns={tableData.columns}
              onEdit={handleEditRecord}
              onDelete={handleDeleteRecord}
              onView={handleViewRecord}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16 }}
          ListEmptyComponent={
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 40,
              backgroundColor: colors.surface,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: colors.border,
            }}>
              <Text style={{ fontSize: 48, marginBottom: 16 }}>🔍</Text>
              <Text style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: colors.textPrimary,
                marginBottom: 8
              }}>
                {searchQuery ? 'No matching records' : 'No records found'}
              </Text>
              <Text style={{
                fontSize: 14,
                color: colors.textSecondary,
                textAlign: 'center'
              }}>
                {searchQuery
                  ? `No records match "${searchQuery}"`
                  : 'Add your first record to get started'
                }
              </Text>
            </View>
          }
        />
      </View>

      {/* View Record Modal */}
      <Modal
        visible={viewModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setViewModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Record Details</Text>
              <TouchableOpacity onPress={() => setViewModalVisible(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            
            {selectedRecord && (
              <View style={styles.recordDetails}>
                {tableData.columns.map((column) => (
                  <View key={column} style={styles.detailRow}>
                    <Text style={styles.detailLabel}>{column}</Text>
                    <Text style={styles.detailValue}>{selectedRecord[column]}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Modal>

      {/* Add Record Modal */}
      <Modal
        visible={addRecordModalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleCancelAddRecord}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.addRecordModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Record</Text>
              <TouchableOpacity onPress={handleCancelAddRecord}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.addRecordForm} showsVerticalScrollIndicator={false}>
              {tableData?.columns.map((column) => (
                <View key={column} style={styles.addRecordField}>
                  <Text style={styles.addRecordLabel}>{column}</Text>
                  <TextInput
                    style={styles.addRecordInput}
                    value={newRecord[column] || ''}
                    onChangeText={(value) => updateNewRecordField(column, value)}
                    placeholder={`Enter ${column.toLowerCase()}`}
                    placeholderTextColor="#666"
                    multiline={false}
                  />
                </View>
              ))}
            </ScrollView>

            <View style={styles.addRecordActions}>
              <TouchableOpacity
                style={styles.cancelAddButton}
                onPress={handleCancelAddRecord}
              >
                <Text style={styles.cancelAddText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveAddButton}
                onPress={handleSaveNewRecord}
              >
                <Text style={styles.saveAddText}>Add Record</Text>
              </TouchableOpacity>
            </View>
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
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 20,
    color: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 20,
    color: '#fff',
  },
  overviewContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  tableTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 12,
  },
  categoryBadge: {
    backgroundColor: '#673AB7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  recordsContainer: {
    flex: 1,
    margin: 16,
    marginTop: 0,
  },
  recordsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recordsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#673AB7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addIcon: {
    fontSize: 16,
    color: '#fff',
    marginRight: 6,
  },
  addText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  recordsList: {
    paddingBottom: 20,
  },
  recordRow: {
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
  recordContent: {
    marginBottom: 12,
  },
  fieldContainer: {
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontWeight: '500',
  },
  fieldValue: {
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  fieldText: {
    fontSize: 14,
    color: '#333',
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#673AB7',
    borderRadius: 6,
    padding: 8,
    fontSize: 14,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 6,
    marginLeft: 8,
  },
  saveIcon: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 8,
    borderRadius: 6,
    marginLeft: 4,
  },
  cancelIcon: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  recordActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  actionButton: {
    padding: 8,
    borderRadius: 6,
    marginLeft: 8,
    backgroundColor: '#f0f0f0',
  },
  deleteButton: {
    backgroundColor: '#ffebee',
  },
  actionIcon: {
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#673AB7',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 20,
    maxHeight: '80%',
    width: '90%',
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
  recordDetails: {
    padding: 20,
  },
  detailRow: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
  addRecordModalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 20,
    maxHeight: '85%',
    width: '90%',
  },
  addRecordForm: {
    maxHeight: 400,
    padding: 20,
  },
  addRecordField: {
    marginBottom: 20,
  },
  addRecordLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  addRecordInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  addRecordActions: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    gap: 12,
  },
  cancelAddButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  cancelAddText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  saveAddButton: {
    flex: 1,
    backgroundColor: '#673AB7',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  saveAddText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

