import React, { useState, useEffect, useRef } from 'react'
//url - uma url ou objeto de request
//options é um objeto

const isObject = (ObjA, ObjB) => {
    if (JSON.stringify(ObjA) === JSON.stringify(ObjB)) return true
}

const useFecth = (url, options) => {
    const [result, setresult] = useState();
    const [isloading, setisloading] = useState(false)
    const [controller, setcontroller] = useState(false)
    const urlRef = useRef(url)
    const optionsRef = useRef(options)
    useEffect(() => {
        if (!isObject(urlRef.current,url)) {
            urlRef.current = url
            setcontroller(x => !x)
        }
        if (!isObject(optionsRef.current,options)) {
            urlRef.current = url
            setcontroller(x => !x)
        }
    }, [url, options])

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
    }, [controller])

    return [result, isloading]

}
const Home = () => {
    const [postid, setpostid] = useState("")
    const [result, isloading] = useFecth("https://jsonplaceholder.typicode.com/posts/" + postid, {
        headers: {
            abc: '1'
        }
    })
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
            <div onClick={()=>handlick("")}>
                <p>{result.title}</p>
            </div>
        }
    </>
    return (
        <div>
            <h1>Oi</h1>
        </div>
    );
}

export default Home;