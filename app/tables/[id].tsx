import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useDrawer } from '../../package-template/src';

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

  return (
    <View style={styles.recordRow}>
      <View style={styles.recordContent}>
        {columns.map((column) => (
          <View key={column} style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>{column}:</Text>
            {editingField === column ? (
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.editInput}
                  value={editValue}
                  onChangeText={setEditValue}
                  autoFocus
                  onBlur={handleEditCancel}
                />
                <TouchableOpacity style={styles.saveButton} onPress={handleEditSave}>
                  <Text style={styles.saveIcon}>✓</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={handleEditCancel}>
                  <Text style={styles.cancelIcon}>✕</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.fieldValue}
                onPress={() => handleEditStart(column, record[column])}
              >
                <Text style={styles.fieldText}>{record[column]}</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
      
      <View style={styles.recordActions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => onView(record)}>
          <Text style={styles.actionIcon}>👁</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]} 
          onPress={() => onDelete(record.id)}
        >
          <Text style={styles.actionIcon}>🗑</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function TableDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { toggle, isOpen } = useDrawer();
  
  const tableId = Array.isArray(id) ? id[0] : id;
  const tableData = mockTableData[tableId as keyof typeof mockTableData];
  
  const [records, setRecords] = useState(tableData?.records || []);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

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

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {tableData.title}
        </Text>
        <TouchableOpacity style={styles.menuButton} onPress={toggle}>
          <Text style={styles.menuIcon}>{isOpen ? '✕' : '☰'}</Text>
        </TouchableOpacity>
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
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addIcon}>+</Text>
            <Text style={styles.addText}>Add Record</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={records}
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
          contentContainerStyle={styles.recordsList}
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
});
