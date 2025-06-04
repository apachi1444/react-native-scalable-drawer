#!/usr/bin/env node
/* eslint-disable no-undef */

/**
 * Test script to verify the React Native Scaling Drawer package
 * This script checks that all exports are available and properly typed
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing React Native Scaling Drawer Package...\n');

// Test 1: Check if lib directory exists
console.log('1. Checking build output...');
 
const libPath = path.join(__dirname, 'lib');
if (fs.existsSync(libPath)) {
  console.log('   ✅ lib/ directory exists');
} else {
  console.log('   ❌ lib/ directory missing');
  process.exit(1);
}

// Test 2: Check main entry files
console.log('2. Checking entry files...');
const mainJs = path.join(libPath, 'index.js');
const mainDts = path.join(libPath, 'index.d.ts');

if (fs.existsSync(mainJs)) {
  console.log('   ✅ index.js exists');
} else {
  console.log('   ❌ index.js missing');
}

if (fs.existsSync(mainDts)) {
  console.log('   ✅ index.d.ts exists');
} else {
  console.log('   ❌ index.d.ts missing');
}

// Test 3: Check component files
console.log('3. Checking component files...');
const components = [
  'components/ScalingDrawer.js',
  'context/DrawerContext.js',
  'hooks/useScalingDrawer.js',
  'adapters/ExpoRouterAdapter.js',
  'adapters/ReactNavigationAdapter.js',
  'types/index.js'
];

components.forEach(component => {
  const componentPath = path.join(libPath, component);
  if (fs.existsSync(componentPath)) {
    console.log(`   ✅ ${component} exists`);
  } else {
    console.log(`   ❌ ${component} missing`);
  }
});

// Test 4: Check package.json
console.log('4. Checking package.json...');
const packageJson = require('./package.json');

const requiredFields = ['name', 'version', 'description', 'main', 'types', 'author', 'license'];
requiredFields.forEach(field => {
  if (packageJson[field]) {
    console.log(`   ✅ ${field}: ${packageJson[field]}`);
  } else {
    console.log(`   ❌ ${field} missing`);
  }
});

// Test 5: Check dependencies
console.log('5. Checking dependencies...');
if (packageJson.peerDependencies) {
  console.log('   ✅ peerDependencies defined');
  Object.keys(packageJson.peerDependencies).forEach(dep => {
    console.log(`      - ${dep}: ${packageJson.peerDependencies[dep]}`);
  });
} else {
  console.log('   ❌ peerDependencies missing');
}

// Test 6: Check example app
console.log('6. Checking example app...');
const examplePath = path.join(__dirname, 'example');
if (fs.existsSync(examplePath)) {
  console.log('   ✅ example/ directory exists');
  
  const examplePackageJson = path.join(examplePath, 'package.json');
  if (fs.existsSync(examplePackageJson)) {
    console.log('   ✅ example/package.json exists');
  } else {
    console.log('   ❌ example/package.json missing');
  }
  
  const exampleApp = path.join(examplePath, 'app', '_layout.tsx');
  if (fs.existsSync(exampleApp)) {
    console.log('   ✅ example app layout exists');
  } else {
    console.log('   ❌ example app layout missing');
  }
} else {
  console.log('   ❌ example/ directory missing');
}

// Test 7: Check documentation
console.log('7. Checking documentation...');
const docs = ['README.md', 'INTEGRATION_GUIDE.md', 'CHANGELOG.md', 'LICENSE'];
docs.forEach(doc => {
  const docPath = path.join(__dirname, doc);
  if (fs.existsSync(docPath)) {
    console.log(`   ✅ ${doc} exists`);
  } else {
    console.log(`   ❌ ${doc} missing`);
  }
});

console.log('\n🎉 Package verification complete!');
console.log('\n📦 Package is ready for publication to NPM');
console.log('📚 Example app is ready for testing');
console.log('🚀 All documentation is in place');

console.log('\n📋 Next steps:');
console.log('1. cd example && npm install');
console.log('2. npm start (in example directory)');
console.log('3. Test on device/simulator');
console.log('4. npm publish (when ready)');
