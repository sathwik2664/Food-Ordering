const os = require('os');
const fs = require('fs');
const path = require('path');

// Get the local IPv4 address
function getLocalIPAddress() {
    const interfaces = os.networkInterfaces();
    for (const interfaceName in interfaces) {
        for (const iface of interfaces[interfaceName]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost'; // Fallback if no IPv4 address is found
}

// Update the .env file
function updateEnvFile(ipAddress) {
    const envFilePath = path.join(__dirname, '.env');
    const envVariable = `API_BASE_URL=http://${ipAddress}:5000`;

    // Check if .env file exists
    if (fs.existsSync(envFilePath)) {
        let content = fs.readFileSync(envFilePath, 'utf8');
        if (content.includes('API_BASE_URL=')) {
            // Update the existing API_BASE_URL
            content = content.replace(/API_BASE_URL=.*/, envVariable);
        } else {
            // Add the variable if not present
            content += `\n${envVariable}`;
        }
        fs.writeFileSync(envFilePath, content, 'utf8');
    } else {
        // Create .env file and add the variable
        fs.writeFileSync(envFilePath, envVariable, 'utf8');
    }

    console.log(`.env updated with IP: ${ipAddress}`);
}

// Main logic
const ipAddress = getLocalIPAddress();
updateEnvFile(ipAddress);
