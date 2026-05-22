import axios from "axios";
const url=import.meta.env.VITE_BACKEND_URL

const axiosInstance=axios.create({
    baseURL:url,
    headers:{
        "Content-Type":'application/json'
    }
})

axiosInstance.interceptors.request.use(
    (config)=>{
        const token=localStorage.getItem('AccessToken')
        if(token){
            config.headers['Authorization']=`Bearer ${token}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response)=> response,
    async (error)=>{
        const OriginalRequest=error.config;
        // console.log('axe error',error)
        if(error.response.status===401 && !OriginalRequest.retry){
            OriginalRequest.retry=true
            const refresh=localStorage.getItem('RefreshToken')
            if(!refresh){
                localStorage.clear()
                return Promise.reject(error);
            }
            try{
                const response=await axios.post(`${url}/token/refresh/`,{refresh:refresh})
                localStorage.setItem('AccessToken',response.data.access)
                console.log('Refreshed')
                // Update the request with the new token and try again
                OriginalRequest.headers['Authorization']=`Bearer ${response.data.access}`
                return axiosInstance(OriginalRequest)
            }catch(RefreshError){
                localStorage.clear()
                return Promise.reject(RefreshError);
            }
        }
        return Promise.reject(error);
    }
)
export default axiosInstance;