const checkIsAdmin = () => {
    const admin = localStorage.getItem('isAdmin')
    if (!admin) {
      location.href = './signin.html'
    } else {
    }
  }
  checkIsAdmin()
  
