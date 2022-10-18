export default getCurrentCity = () => {
    const localcity = JSON.parse(localStorage.getItem('CITY_DATA'))
    if(!city) {
        return new Promise((resolve, reject) => {
        
            const city = new window.BMapGL.LocalCity()
            
            city.get((list) => {
                try {
                    // 将城市传过去，获取当前城市的数据 axios
                    console.log(list.name)
                    setCity(list.name)
                    // 存储在本地
                    localStorage.setItem('CITY_DATA', {})
                    resolve('获取的数据')
                } catch(e) {
                    // 获取定位失败
                    reject(e)
                }
              
            })
            const curcity = new window.BMapGl
        })
    } else {
        // 返回本地存储中的数据
        return Promise.resolve(localcity)
    }
   
}