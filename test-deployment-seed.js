// Test script to verify deployment seeding functionality
import { seedDefaultAdmin, DEPLOYMENT_ADMIN_CREDENTIALS } from './server/seed.js';

console.log('🧪 Testing deployment seed functionality...\n');

try {
  // Test seeding
  const credentials = await seedDefaultAdmin();
  
  console.log('✅ Seeding test passed!');
  console.log('📧 Default Admin Email:', credentials.email);
  console.log('🔗 Login URL:', credentials.loginUrl);
  console.log('📝 Note:', credentials.note);
  console.log('\n🎯 Credentials that will be displayed on admin screen:');
  console.log(JSON.stringify(DEPLOYMENT_ADMIN_CREDENTIALS, null, 2));
  
} catch (error) {
  console.error('❌ Seeding test failed:', error);
  process.exit(1);
}