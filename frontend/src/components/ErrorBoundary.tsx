import type {ErrorInfo,ReactNode} from "react";
import {Component} from "react"

interface props{
    children:ReactNode;
}
interface state{
    hasError:boolean;
}

class ErrorBoundary extends Component<props,state>{
    constructor(props:props){
        super(props)
        this.state={hasError:false}
    }
    static getDerivedStateFromError():state{
          return{hasError:true};
    }
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
                console.error("Error caught by boundary:",error,errorInfo);
    }
    render(){
       if (this.state.hasError){
        console.log(this.state.hasError);
        return(<h2 style={{ color: "white", textAlign: "center", padding:"20px" }}>Something Went Wrong</h2>)

       }else{
        return this.props.children
       }
    }
}

export default ErrorBoundary;