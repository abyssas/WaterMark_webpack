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
        this.state = { txt: '', ratio: '' }
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e: any) {
        const target = e.target
        const name = target.name
        this.setState({ [name]: target.value }, () => { this.props.sendAction(this.state.txt, this.state.ratio) })
        // console.log(this.state)
    }

    componentDidMount(): void {
        const range = document.getElementById("range") as any
        range.value = "0"
        store.subscribe(() => {
            console.log('subs:', store.getState())
        })
    }

    onclick() {
        const range = document.getElementById("range") as any
        console.log(range.value)
    }

    render() {
        return (
            <div className="box">
                <h3 className="txt">水印文字:</h3><br />
                <input className="input" type='text' name='txt' onChange={this.handleChange} placeholder={"仅供支付宝xxx实名认证使用，他用无效"} />
                <br />
                <span className="txt">请输入您想要添加的水印比例:</span><br />
                {/* <input className="input" type='text' onChange={this.handleChange} /><br /> */}
                <input id="range" type="range" min="0" max="1" step="0.01" name='ratio' onChange={this.handleChange} />
            </div>

        )
    }
}
const mapDispatch = (dispatch: any) => {
    return {
        sendAction: (txt: any, ratio: any) => {
            dispatch({
                type: "add",
                data: txt,
                ratio: ratio
            })
        }
    }
}


export default connect(null, mapDispatch)(Txt)