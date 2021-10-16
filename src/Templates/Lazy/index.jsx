import React, {Suspense, useState} from "react";
//import LazyComponent from "./LazyComponent";
//

const LazyComponent = React.lazy(()=> import('./LazyComponent'))

const Lazy = () => {
    const [show, setshow] = useState(false)
    return(
        <div>
            <p>
                <button onClick={()=> setshow(s => !s)}>Show</button>
            </p>
            <Suspense fallback={<p>Carregando</p>}>
                {show && <LazyComponent />}
            </Suspense>
        </div>
    );
}

export default Lazy