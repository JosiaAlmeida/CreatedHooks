import { useCallback, useEffect, useState } from "react";

const AsyncData =(asycFunction, isShow)=>{
    const [result, setresult] = useState(null)
    const [error, seterror] = useState(null)
    const [isStatuts, setisStatuts] = useState('idle')
    const run = useCallback(() => {
        seterror(null)
        setresult(null)
        setisStatuts('peding')

        return asycFunction().then((resp)=>{
            setisStatuts('settled')
            setresult(resp)
        }).catch((err)=>{
            setisStatuts('error')
            seterror(err)
        })
    },[asycFunction])

    useEffect(()=>{
        if(isShow) run()
    }, [isShow])

    return [run, result, error, isStatuts]
}


const fetchData = async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/posts/")
    const dataJson = await data.json()
    return dataJson
}

const Post = () => {
    const [post, setpost] = useState(null)
    const [run, result, error, isStatus] = AsyncData(fetchData, true)
    
    return (
        <div>
            <pre>
                {JSON.stringify(result, null, 2)}
            </pre>
        </div>
    );
}

export default Post;