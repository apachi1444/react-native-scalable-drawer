import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDrawer } from '@apachi14444/react-native-scaling-drawer';

const columnTypes = [
  { value: 'text', label: 'Text', icon: '📝' },
  { value: 'number', label: 'Number', icon: '🔢' },
  { value: 'date', label: 'Date', icon: '📅' },
  { value: 'email', label: 'Email', icon: '📧' },
  { value: 'phone', label: 'Phone', icon: '📞' },
  { value: 'url', label: 'URL', icon: '🔗' },
  { value: 'boolean', label: 'Yes/No', icon: '✅' },
];

interface Column {
  id: string;
  name: string;
  type: string;
}

interface ColumnConfigProps {
  column: Column;
  index: number;
  onUpdate: (id: string, field: string, value: string) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

const ColumnConfig: React.FC<ColumnConfigProps> = ({ 
  column, 
  index, 
  onUpdate, 
  onRemove, 
  canRemove 
}) => {
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  
  const selectedType = columnTypes.find(type => type.value === column.type);

  return (
    <View style={styles.columnContainer}>
      <View style={styles.columnHeader}>
        <Text style={styles.columnTitle}>Column {index + 1}</Text>
        {canRemove && (
          <TouchableOpacity 
            style={styles.removeButton}
            onPress={() => onRemove(column.id)}
          >
            <Text style={styles.removeIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Column Name</Text>
        <TextInput
          style={styles.textInput}
          value={column.name}
          onChangeText={(value) => onUpdate(column.id, 'name', value)}
          placeholder="Enter column name"
          placeholderTextColor="#666"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Column Type</Text>
        <TouchableOpacity 
          style={styles.typeSelector}
          onPress={() => setTypeModalVisible(true)}
        >
          <View style={styles.typeDisplay}>
            <Text style={styles.typeIcon}>{selectedType?.icon}</Text>
            <Text style={styles.typeText}>{selectedType?.label || 'Select type'}</Text>
          </View>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>
      </View>

      {/* Type Selection Modal */}
      <Modal
        visible={typeModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setTypeModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.typeModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Column Type</Text>
              <TouchableOpacity onPress={() => setTypeModalVisible(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.typeList}>
              {columnTypes.map((type) => (
                <TouchableOpacity
                  key={type.value}
                  style={[
                    styles.typeOption,
                    column.type === type.value && styles.selectedType
                  ]}
                  onPress={() => {
                    onUpdate(column.id, 'type', type.value);
                    setTypeModalVisible(false);
                  }}
                >
                  <Text style={styles.typeOptionIcon}>{type.icon}</Text>
                  <Text style={[
                    styles.typeOptionText,
                    column.type === type.value && styles.selectedTypeText
                  ]}>
                    {type.label}
                  </Text>
                  {column.type === type.value && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default function CreateTableScreen() {
  const router = useRouter();
  const { toggle, isOpen } = useDrawer();
  
  const [tableName, setTableName] = useState('');
  const [columns, setColumns] = useState<Column[]>([
    { id: '1', name: '', type: 'text' },
    { id: '2', name: '', type: 'text' },
  ]);
  const [isCreating, setIsCreating] = useState(false);

  const updateColumn = (id: string, field: string, value: string) => {
    setColumns(prevColumns =>
      prevColumns.map(column =>
        column.id === id ? { ...column, [field]: value } : column
      )
    );
  };

  const removeColumn = (id: string) => {
    if (columns.length > 1) {
      setColumns(prevColumns => prevColumns.filter(column => column.id !== id));
    }
  };

  const addColumn = () => {
    const newId = (Math.max(...columns.map(c => parseInt(c.id))) + 1).toString();
    setColumns(prevColumns => [
      ...prevColumns,
      { id: newId, name: '', type: 'text' }
    ]);
  };

  const validateForm = () => {
    if (!tableName.trim()) {
      Alert.alert('Error', 'Please enter a table name');
      return false;
    }

    const emptyColumns = columns.filter(column => !column.name.trim());
    if (emptyColumns.length > 0) {
      Alert.alert('Error', 'Please fill in all column names');
      return false;
    }

    const duplicateNames = columns.filter((column, index) =>
      columns.findIndex(c => c.name.toLowerCase() === column.name.toLowerCase()) !== index
    );
    if (duplicateNames.length > 0) {
      Alert.alert('Error', 'Column names must be unique');
      return false;
    }

    return true;
  };

  const handleCreateTable = async () => {
    if (!validateForm()) return;

    setIsCreating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsCreating(false);
      Alert.alert(
        'Success',
        'Table created successfully!',
        [
          {
            text: 'OK',
            onPress: () => router.push('/tables')
          }
        ]
      );
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Table</Text>
        <TouchableOpacity style={styles.menuButton} onPress={toggle}>
          <Text style={styles.menuIcon}>{isOpen ? '✕' : '☰'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Table Name Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Table Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Table Name</Text>
            <TextInput
              style={styles.textInput}
              value={tableName}
              onChangeText={setTableName}
              placeholder="Enter table name"
              placeholderTextColor="#666"
            />
          </View>
        </View>

        {/* Columns Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Columns ({columns.length})</Text>
            <TouchableOpacity style={styles.addColumnButton} onPress={addColumn}>
              <Text style={styles.addColumnIcon}>+</Text>
              <Text style={styles.addColumnText}>Add Column</Text>
            </TouchableOpacity>
          </View>

          {columns.map((column, index) => (
            <ColumnConfig
              key={column.id}
              column={column}
              index={index}
              onUpdate={updateColumn}
              onRemove={removeColumn}
              canRemove={columns.length > 1}
            />
          ))}
        </View>

        {/* Preview Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preview</Text>
          <View style={styles.previewContainer}>
            <Text style={styles.previewTableName}>{tableName || 'Untitled Table'}</Text>
            <View style={styles.previewColumns}>
              {columns.map((column, index) => (
                <View key={column.id} style={styles.previewColumn}>
                  <Text style={styles.previewColumnName}>
                    {column.name || `Column ${index + 1}`}
                  </Text>
                  <Text style={styles.previewColumnType}>
                    {columnTypes.find(type => type.value === column.type)?.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Create Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.createButton, isCreating && styles.createButtonDisabled]}
          onPress={handleCreateTable}
          disabled={isCreating}
        >
          <Text style={styles.createButtonText}>
            {isCreating ? 'Creating Table...' : 'Create Table'}
          </Text>
        </TouchableOpacity>
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
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  addColumnButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#673AB7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addColumnIcon: {
    fontSize: 16,
    color: '#fff',
    marginRight: 6,
  },
  addColumnText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  columnContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  columnHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  columnTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  removeButton: {
    backgroundColor: '#f44336',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeIcon: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  typeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  typeDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  typeText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  typeModalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '60%',
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
  typeList: {
    maxHeight: 300,
  },
  typeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedType: {
    backgroundColor: '#f3e5f5',
  },
  typeOptionIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  typeOptionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  selectedTypeText: {
    color: '#673AB7',
    fontWeight: '500',
  },
  checkmark: {
    fontSize: 16,
    color: '#673AB7',
    fontWeight: 'bold',
  },
  previewContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  previewTableName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  previewColumns: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  previewColumn: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    minWidth: 100,
  },
  previewColumnName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
  },
  previewColumnType: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  createButton: {
    backgroundColor: '#673AB7',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  createButtonDisabled: {
    backgroundColor: '#ccc',
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
