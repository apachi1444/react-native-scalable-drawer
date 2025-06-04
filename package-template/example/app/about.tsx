import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { useDrawerContext } from 'react-native-scaling-drawer';

export default function AboutScreen() {
  const { openDrawer } = useDrawerContext();

  const openGitHub = () => {
    Linking.openURL('https://github.com/89viral1/react-native-scaling-drawer');
  };

  const openNPM = () => {
    Linking.openURL('https://www.npmjs.com/package/react-native-scaling-drawer');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={openDrawer}
        >
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.logoCard}>
          <Text style={styles.logo}>📱</Text>
          <Text style={styles.appName}>React Native Scaling Drawer</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎨 What is this?</Text>
          <Text style={styles.cardDescription}>
            React Native Scaling Drawer is a beautiful, performant drawer navigation 
            component with scaling animations and shadow effects. It provides a modern 
            alternative to traditional drawer navigation with smooth, eye-catching animations.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>✨ Key Features</Text>
          <View style={styles.featureList}>
            <Text style={styles.feature}>• Beautiful scaling animations</Text>
            <Text style={styles.feature}>• Smooth 60fps performance</Text>
            <Text style={styles.feature}>• TypeScript support</Text>
            <Text style={styles.feature}>• Expo Router integration</Text>
            <Text style={styles.feature}>• React Navigation support</Text>
            <Text style={styles.feature}>• Customizable styling</Text>
            <Text style={styles.feature}>• Gesture support</Text>
            <Text style={styles.feature}>• Shadow effects</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>👨‍💻 Developer</Text>
          <Text style={styles.cardDescription}>
            Created by 89viral1 with ❤️ for the React Native community.
          </Text>
        </View>

        <View style={styles.linksSection}>
          <TouchableOpacity style={styles.linkButton} onPress={openGitHub}>
            <Text style={styles.linkIcon}>🐙</Text>
            <Text style={styles.linkText}>View on GitHub</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={openNPM}>
            <Text style={styles.linkIcon}>📦</Text>
            <Text style={styles.linkText}>View on NPM</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📄 License</Text>
          <Text style={styles.cardDescription}>
            This project is licensed under the MIT License. Feel free to use it 
            in your personal and commercial projects.
          </Text>
        </View>

        <View style={styles.thankYouCard}>
          <Text style={styles.thankYouText}>
            Thank you for using React Native Scaling Drawer! 🎉
          </Text>
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
  logoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
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
  logo: {
    fontSize: 60,
    marginBottom: 15,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  version: {
    fontSize: 16,
    color: '#673AB7',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cardDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  featureList: {
    marginTop: 10,
  },
  feature: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 5,
  },
  linksSection: {
    marginBottom: 15,
  },
  linkButton: {
    backgroundColor: '#673AB7',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  linkIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  linkText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  thankYouCard: {
    backgroundColor: '#673AB7',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  thankYouText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});
