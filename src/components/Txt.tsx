import React, { ChangeEvent, useState } from "react";
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import '../styles/Txt.scss'
import Picture from "./Picture";
import store from "../store";
import { connect } from "react-redux";

class Txt extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { txt: '', ratiox: '', ratioy: '', size: '' }
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e: any) {
        const target = e.target
        const name = target.name
        this.setState({ [name]: target.value }, () => {
            this.props.sendAction(this.state.txt, this.state.ratiox, this.state.ratioy, this.state.size)
        })
        // console.log(this.state)
    }

    componentDidMount(): void {
        const rangex = document.getElementById("rangex") as any
        const rangey = document.getElementById("rangey") as any
        const size = document.getElementById("size") as any
        rangex.value = "0"
        rangey.value = "0"
        size.value = "0"
        // store.subscribe(() => {
        //     console.log('subs:', store.getState())
        // })
    }

    render() {
        return (
            <div className="box">
                <h3 className="txt">水印文字:</h3>
                <input className="input" type='text' name='txt' onChange={this.handleChange} placeholder={"仅供支付宝xxx实名认证使用，他用无效"} />

                <div className="ratio">
                    <div className="ratio-ch">
                        <span className="txt">横向水印密度:</span>
                        <input id="rangex" type="range" min="0" max="1" step="0.01" name='ratiox' onChange={this.handleChange} />
                    </div>
                    <div className="ratio-ch">
                        <span className="txt">纵向水印密度:</span>
                        <input id="rangey" type="range" min="0" max="1" step="0.01" name='ratioy' onChange={this.handleChange} />
                    </div>
                </div>
                <span className="txt">请输入您想要添加的字体大小:</span>
                {/* <input className="input" type='text' onChange={this.handleChange} /><br /> */}
                <input id="size" type="range" min="0" max="1" step="0.05" name='size' onChange={this.handleChange} />
            </div>

        )
    }
}
const mapDispatch = (dispatch: any) => {
    return {
        sendAction: (txt: any, ratiox: any, ratioy: any, size: any) => {
            dispatch({
                type: "add",
                data: txt,
                ratiox: ratiox,
                ratioy: ratioy,
                size: size
            })
        }
    }
}


export default connect(null, mapDispatch)(Txt)