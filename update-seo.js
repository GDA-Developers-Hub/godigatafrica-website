import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceDir = path.join(__dirname, 'src', 'LandingPage', 'OtherPages', 'Services');

// Map of files to their corresponding service keys
const serviceKeyMap = {
  'PaidSocial.jsx': 'paidSocial',
  'SocialMediaManagement.jsx': 'socialMediaManagement',
  'LinkedInAds.jsx': 'linkedInAds',
  'EcommerceDesign.jsx': 'ecommerceDesign',
  'SoftwareDevelopment.jsx': 'softwareDevelopment',
  'SEO.jsx': 'seo',
  'SocialMediaMarketing.jsx': 'socialMediaMarketing',
  'ContentMarketing.jsx': 'contentMarketing',
  'GoogleAds.jsx': 'googleAds',
  'SocialPlatformMarketing.jsx': 'socialPlatformMarketing',
  'CopyWriting.jsx': 'copywriting',
  'GoogleDisplayNetwork.jsx': 'googleDisplayNetwork',
  'GoogleShopping.jsx': 'googleShopping',
  'InfluencerMarketing.jsx': 'influencerMarketing',
  'LocalSeo.jsx': 'localSEO',
  'TechnicalSeo.jsx': 'technicalSEO',
  'YouTubeAds.jsx': 'youtubeAds',
  'SERM.jsx': 'serm',
  'SeoReferalProgram.jsx': 'seoReferral',
  'InternalSeo.jsx': 'internationalSEO',
  'SEM.jsx': 'sem',
  'CoporateWebDev.jsx': 'corporateWebsite',
  'LandingPageDev.jsx': 'landingPage',
  'WebsiteMaintainance.jsx': 'websiteMaintenance',
  'SocialMediaContent.jsx': 'socialMediaContent'
};

// Process all service files
fs.readdir(serviceDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach(file => {
    const serviceKey = serviceKeyMap[file];
    if (!serviceKey) {
      console.log(`Skipping ${file} - no service key mapping found`);
      return;
    }

    const filePath = path.join(serviceDir, file);
    
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading ${file}:`, err);
        return;
      }

      // Check if file already has the SEO import
      if (data.includes('import { ServiceSEO }')) {
        console.log(`${file} already has SEO import - skipping`);
        return;
      }

      // Add the import statement after the last import
      let updatedContent = data;
      const lastImportIndex = data.lastIndexOf('import');
      if (lastImportIndex !== -1) {
        const endOfLastImportIndex = data.indexOf('\n', lastImportIndex) + 1;
        updatedContent = 
          data.substring(0, endOfLastImportIndex) + 
          `import { ServiceSEO } from "../../../SEO";\n\n` + 
          data.substring(endOfLastImportIndex);
      }

      // Find the start of the component's return statement
      const componentReturnIndex = updatedContent.indexOf('return (');
      if (componentReturnIndex !== -1) {
        let openingTagIndex = updatedContent.indexOf('<', componentReturnIndex);
        if (openingTagIndex !== -1) {
          // Find the end of the first opening tag line
          const openingTagEndIndex = updatedContent.indexOf('>', openingTagIndex) + 1;
          if (openingTagEndIndex !== -1) {
            // Add the ServiceSEO component after the first opening tag
            updatedContent = 
              updatedContent.substring(0, openingTagEndIndex) + 
              `\n      <ServiceSEO service="${serviceKey}" />` + 
              updatedContent.substring(openingTagEndIndex);
          }
        }
      }

      // Write the updated content back to the file
      fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
        if (err) {
          console.error(`Error writing to ${file}:`, err);
          return;
        }
        console.log(`Successfully updated ${file} with SEO for service ${serviceKey}`);
      });
    });
  });
}); 