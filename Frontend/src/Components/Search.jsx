import React, { useEffect } from 'react'
import Nav from './Nav'
import axiosInstance from './AxiosInstance'
import { useState } from 'react'
import Items from './Items'
import { useLocation } from 'react-router-dom'
const Search = () => {
    const [items,setItems]=useState(false)
    const loc=useLocation()
    const search=async ()=>{
        let item=localStorage.getItem('FoodItem')
        let place=localStorage.getItem('ResId')
        console.log('search',item)
        if(item && place){
            try{
                // console.log('Item -',item,prop.res.id)
                const Menu=await axiosInstance.post(`/menu/PullRestaurantItem/`,{item:item, "restaurant": place})
                // console.log('item fetched ',Menu.data.pop(),Menu.data.pop()['id'])
                const it=await axiosInstance.get(`/menu/${Menu.data.pop().id}/`)
                setItems([it.data])
            }catch(error){
                console.log(error)
                localStorage.removeItem('FoodItem')
                localStorage.removeItem('ResId')
            }
        }else if(item){
            try{
                const Menu=await axiosInstance.post(`/menu/PullItem/`,{item:item})
                console.log('multi item fetch',Menu.data)
                setItems(Menu.data)
            }catch(error){
                console.log(error)
                localStorage.removeItem('FoodItem')
                localStorage.removeItem('ResId')
            }
        }else{}
    }
    useEffect(()=>{search()},[loc])
  return (
    <>
    <h1 className='d-flex justify-content-center fst-italic'>Make My Food</h1>
    <Nav/>
    {(items)?(<Items items={items}/>):(<><h3>Item not Found</h3></>)}
    </>
  )
}

export default Search