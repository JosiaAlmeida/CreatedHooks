import React, { useState, useEffect, useRef } from 'react'
//url - uma url ou objeto de request
//options é um objeto

const isObject = (ObjA, ObjB) => {
    if (JSON.stringify(ObjA) === JSON.stringify(ObjB)) return true
}

const useFecth = (url, options) => {
    const [result, setresult] = useState();
    const [isloading, setisloading] = useState(false)
    const urlRef = useRef(url)
    const optionsRef = useRef(options)
    const [controller, setcontroller] = useState(false)
    useEffect(() => {
        if (!isObject(url, urlRef.current)) {
            urlRef.current = url
            setcontroller(x => !x)
        }
    }, [url])

    useEffect(() => {
        setisloading(true)
        const Fecth = async () => {
            await new Promise((r) => setTimeout(r, 3000))
            try {
                const resp = await fetch(urlRef.current, optionsRef.current)
                const jsonResponse = await resp.json()
                setresult(jsonResponse)
                setisloading(false)
            } catch (error) {
                setisloading(false)
                throw error
            }
        }
        Fecth()
    }, [])

    return [result, isloading]

}
const Home = () => {
    const [postid, setpostid] = useState("")
    const [result, isloading] = useFecth("https://jsonplaceholder.typicode.com/posts/" + postid, {
        headers: {
            abc: '1'
        }
    })
    useEffect(()=>{
        console.log(result)
    },[postid])
    const handlick = (id) => {
        setpostid(id)
    }
    if (isloading) return <h1>Loading....</h1>
    if (!isloading && result) return <>
        {
            result.length > 0 ?
            result.map(post=> <div onClick={()=>handlick(post.id)} key={post.id}>
                <p> {post.title} </p>
            </div>) :
            <div onClick={()=>handlick("")}>oi</div>
        }
    </>
    return (
        <div>
            <h1>Oi</h1>
        </div>
    );
}

export default Home;