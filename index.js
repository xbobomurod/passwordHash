let currentHash = ''

async function generateHash() {
	const password = document.getElementById('genPassword').value
	const rounds = parseInt(document.getElementById('saltRounds').value)
	if (!password) return

	currentHash = await dcodeIO.bcrypt.hash(password, rounds)
	document.getElementById('genResult').textContent = currentHash
}

function copyHash() {
	if (!currentHash) return
	navigator.clipboard.writeText(currentHash)
	showNotification('✅ Hash copied!')
}

function clearGenerator() {
	document.getElementById('genPassword').value = ''
	document.getElementById('genResult').textContent = ''
	currentHash = ''
}

async function autoVerify() {
	const hash = document.getElementById('inputHash').value
	const password = document.getElementById('verifyPassword').value
	if (!hash || !password) {
		document.getElementById('verifyResult').textContent = ''
		return
	}

	const match = await dcodeIO.bcrypt.compare(password, hash)
	document.getElementById('verifyResult').textContent = match
		? '✅ Verified'
		: '❌ Not verified'
}

function clearVerifier() {
	document.getElementById('inputHash').value = ''
	document.getElementById('verifyPassword').value = ''
	document.getElementById('verifyResult').textContent = ''
}

/* Notification */
function showNotification(msg) {
	const notif = document.getElementById('notification')
	notif.textContent = msg
	notif.style.display = 'block'
	setTimeout(() => {
		notif.style.display = 'none'
	}, 2000)
}

/* Dark/Light mode */
document.getElementById('modeToggle').addEventListener('click', () => {
	document.body.classList.toggle('dark')
	document.getElementById('modeToggle').textContent =
		document.body.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode'
})
