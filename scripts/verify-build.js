#!/usr/bin/env node

/**
 * Verification script for build outputs
 * Ensures all required files are present in the build
 */

const fs = require('fs')
const path = require('path')

const TENANTS = ['clark', 'bruce']
const REQUIRED_FILES = ['index.html', '.nojekyll', 'umi.js', 'umi.css']

console.log('🔍 Verifying build outputs...\n')

let hasErrors = false

TENANTS.forEach((tenant) => {
	const distPath = path.join(__dirname, '..', 'dist', tenant)
	
	console.log(`Checking ${tenant} tenant...`)
	
	if (!fs.existsSync(distPath)) {
		console.error(`❌ Error: dist/${tenant}/ directory not found`)
		hasErrors = true
		return
	}
	
	REQUIRED_FILES.forEach((file) => {
		const filePath = path.join(distPath, file)
		if (!fs.existsSync(filePath)) {
			console.error(`  ❌ Missing: ${file}`)
			hasErrors = true
		} else {
			const stats = fs.statSync(filePath)
			console.log(`  ✅ ${file} (${(stats.size / 1024).toFixed(2)} KB)`)
		}
	})
	
	console.log('')
})

if (hasErrors) {
	console.error('❌ Build verification failed!')
	process.exit(1)
} else {
	console.log('✅ All build outputs verified successfully!')
	process.exit(0)
}

