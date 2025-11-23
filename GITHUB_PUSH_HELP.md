# 🔐 GitHub Push Authentication Help

## Issue: Permission Denied

You're authenticated as `nireah-creates` but trying to push to `wifty-hub/StudyBuds`.

## Solutions:

### Option 1: Use Personal Access Token (Easiest)

1. **Generate a token**:
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Name: "StudyBuds Push"
   - Select scopes: `repo` (full control)
   - Click "Generate token"
   - **Copy the token** (you won't see it again!)

2. **Push with token**:
   ```powershell
   git remote set-url origin https://YOUR_TOKEN@github.com/wifty-hub/StudyBuds.git
   git push -u origin main
   ```
   Replace `YOUR_TOKEN` with your actual token.

### Option 2: Use SSH (Recommended for long-term)

1. **Check if you have SSH key**:
   ```powershell
   ls ~/.ssh/id_rsa.pub
   ```

2. **If not, generate one**:
   ```powershell
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

3. **Add to GitHub**:
   - Copy your public key: `cat ~/.ssh/id_rsa.pub`
   - Go to: https://github.com/settings/keys
   - Click "New SSH key"
   - Paste and save

4. **Change remote to SSH**:
   ```powershell
   git remote set-url origin git@github.com:wifty-hub/StudyBuds.git
   git push -u origin main
   ```

### Option 3: Switch GitHub Account

1. **Logout current account**:
   ```powershell
   git config --global --unset user.name
   git config --global --unset user.email
   ```

2. **Login with correct account**:
   - Use GitHub Desktop
   - Or use: `gh auth login` (GitHub CLI)

3. **Then push**:
   ```powershell
   git push -u origin main
   ```

## Quick Fix (Copy & Paste):

```powershell
# Replace YOUR_TOKEN with your personal access token
git remote set-url origin https://YOUR_TOKEN@github.com/wifty-hub/StudyBuds.git
git push -u origin main
```

---

**Need a token?** Go to: https://github.com/settings/tokens

