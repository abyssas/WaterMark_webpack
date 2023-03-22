import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { connect } from 'react-redux';
import store from '../store';
import "../styles/Picture.scss"


interface IState {
    imgUrl: any,
    imgWidth: any,
    imgHeight: any
}
class Picture extends React.Component<any, IState>{
    state = {
        imgUrl: '',
        imgWidth: 0,
        imgHeight: 0
    }

    componentDidMount(): void {
        let cvs = document.getElementById('cvs') as any;
        let page = document.getElementById("edit-page") as any
        cvs.width = document.getElementById("edit-page")?.offsetWidth
        cvs.width = cvs.width - 5
    }

    draw = () => {
        let cvs = document.getElementById('cvs') as any;
        let page = document.getElementById("edit-page") as any
        var ctx = cvs.getContext('2d')
        let str = store.getState().txt as any
        let ratiox = store.getState().ratiox as any
        let ratioy = store.getState().ratioy as any
        let size = store.getState().size as any
        let width = cvs.width
        let height = cvs.height

        var img = new Image()
        img.src = this.state.imgUrl
        this.setState({
            imgWidth: img.width,
            imgHeight: img.height
        }, () => {
        })


        ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
        str = store.getState().txt
        ratiox = store.getState().ratiox
        ratioy = store.getState().ratioy
        size = store.getState().size
        cvs.style.backgroundImage = cvs.toDataURL()
        let flag = 1;

        for (let i = (-width / 10); i < width / 10; i++) {
            for (let j = (-height / 10); j < height / 10; j++) {
                ctx.translate(width / 2, height / 2);
                ctx.scale(2, 2);
                ctx.rotate(-20 * Math.PI / 180)
                ctx.translate(-width / 2, -height / 2);
                // ctx.fillRect(0, 0, width, height)
                ctx.font = `${size}em Arial`;

                // let size = document.getComputedStyle(ctx).fontSize as any
                ctx.textAlign = 'center';
                ctx.fillStyle = "rgba(32,37,53,0.5)";
                ctx.fillText(str, (i * (str.length * 10) / ratiox), ((j * 20 + i * 50) / ratioy));
                flag = flag * (-1)
                ctx.rotate(20 * Math.PI / 180)

                ctx.restore();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
            }

        }
    }

    onChangeHandler = (e: any) => {
        let dpr = window.devicePixelRatio;
        let file = e.target.files[0]
        let img = new Image()
        this.setState({
            imgUrl: window.URL.createObjectURL(file),
        }, () => {
            img.src = this.state.imgUrl;
        })
        // console.log("1312321", this.state.imgUrl)
        let cvs = document.getElementById('cvs') as any;
        cvs.style.boxShadow = "0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 80px 0 rgba(0, 0, 0, 0.19)"
        var ctx = cvs.getContext('2d')
        cvs.width = document.getElementById("cvs")?.offsetWidth
        cvs.width = cvs.width - 5
        const page = document.getElementById("edit-page")
        if (page) {
            if (cvs.height > page.style.height) {
                page.style.height = 'auto'
            }
        }

        img.onload = () => {

            cvs.height = cvs.width * (img.height / img.width)
            ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
            this.draw()
        }
        // var draw = this.draw()
        store.subscribe(() => {
            this.draw();
        })
        const btn = document.getElementById("upload") as any
        btn.innerHTML = "<input type='button' id='loading' value='点击下载' />"
        btn.style.display = "block";
        const upbtn = document.getElementById("up") as any;
        upbtn.style.textAlign = "right";
    }


    download = () => {
        var canvas = document.querySelector('#cvs') as any;

        var _canvas = document.createElement('canvas');
        _canvas.id = "drawImg";
        _canvas.style.display = 'none';
        document.body.appendChild(_canvas);
        var canvas2 = document.getElementById('drawImg') as any;
        var ctx2 = canvas2.getContext('2d');
        // var img = document.createElement('img');
        canvas2.width = this.state.imgWidth;
        canvas2.height = this.state.imgHeight;
        var url = canvas.toDataURL()
        let img = new Image()
        img.src = url;
        img.onload = () => {
            ctx2.drawImage(img, 0, 0, canvas2.width, canvas2.height)
            const el = document.createElement('a');
            el.href = canvas2.toDataURL();
            el.download = '水印照片';
            const event = new MouseEvent('click');
            el.dispatchEvent(event);
        }


    }

    render() {
        return (
            <div className="edit-page" id="edit-page">
                <div id='up'>
                    <label >
                        <input type="button" id="btn" value="点我上传" />
                        <input type="file" id="picture" onChange={this.onChangeHandler} />
                    </label>

                    <div id="upload" onClick={this.download} style={{ display: 'none' }}></div>

                </div>
                <div className='cvsbox' id='cvsbox'>
                    <canvas id="cvs" ></canvas>
                </div>

                <br />
            </div>
        );
    }
}
const mapStateToProps = (state: any) => {
    return state
}

export default connect(mapStateToProps)(Picture)