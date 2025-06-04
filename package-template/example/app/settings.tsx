import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSync, setAutoSync] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔔 Notifications</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Push Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#ccc', true: '#673AB7' }}
              thumbColor={notifications ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎨 Appearance</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#ccc', true: '#673AB7' }}
              thumbColor={darkMode ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔄 Sync</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Auto Sync</Text>
            <Switch
              value={autoSync}
              onValueChange={setAutoSync}
              trackColor={{ false: '#ccc', true: '#673AB7' }}
              thumbColor={autoSync ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📱 Drawer Settings</Text>
          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionLabel}>Animation Speed</Text>
            <Text style={styles.actionValue}>Normal ›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionLabel}>Scale Factor</Text>
            <Text style={styles.actionValue}>85% ›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionLabel}>Slide Distance</Text>
            <Text style={styles.actionValue}>280px ›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ℹ️ About</Text>
          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionLabel}>Version</Text>
            <Text style={styles.actionValue}>1.0.0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionLabel}>Privacy Policy</Text>
            <Text style={styles.actionValue}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionLabel}>Terms of Service</Text>
            <Text style={styles.actionValue}>›</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#673AB7',
  },
  menuButton: {
    padding: 10,
    marginRight: 15,
  },
  menuIcon: {
    fontSize: 24,
    color: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    padding: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionLabel: {
    fontSize: 16,
    color: '#333',
  },
  actionValue: {
    fontSize: 16,
    color: '#673AB7',
    fontWeight: '500',
  },
});
