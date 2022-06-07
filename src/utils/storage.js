class Storage {
//   constructor() {}
  set(key, value) {
    localStorage.setItem(
      key,
      JSON.stringify({
        value
      })
    )
  }
  remove(key) {
    localStorage.removeItem(key)
  }
  get(key) {
    const res = localStorage.getItem(key)
    if (res) {
      const data = JSON.parse(res)
      return data.value
    } else {
      return null
    }
  }
  claer() {
    localStorage.clear()
  }
}

export default new Storage()
