<template>
  <div id="app">
    <div class="nav-cnt">
        <div class="header__top">
            <ul>
                <li><a href="#" class="nav-item">Услуги и цены </a></li>
                <li><a href="#" class="nav-item">Доставка и оплата</a></li>
                <li><a href="#" class="nav-item"><i class="fa fa-paper-plane"></i>info@printut.ru</a></li>
                <li><a href="#" class="nav-item"><i class="fa fa-phone"></i>97 470 08 95</a></li>
            </ul>
            <div class="logo-cnt">
                <div class="hr-line">
                    <div class="logo">Logo</div>
                </div>
            </div>
        </div>
        <div class="bot_menu_cnt">
            <div class="header__center">
                <a href="#" class="shablon">Шаблоны визиток</a>
                <a href="#" class="cons">Конструктор</a>
            </div>
            <div class="center__icons">
                <div class="user"><i class="fa fa-user"></i></div>
                <a href="#" class="shop"><i class="fa fa-shopping-cart"></i></a>
                <button class="fa fa-search search"></button>
                <a href="#" class="question"><i class="fa fa-question-circle"></i></a>
            </div>
        </div>
        <div class="header__bottom">
            <h1>Конструктор визиток онлайн</h1>
            <div class="toolbar_rightbar">
                <button :class="['tool_item', {hidden : $root.sequenceOfChange > countChange + 1} ]" @click="backChange"><i class="fas fa-arrow-left"></i></button>
                <button class="tool_item" @click="frontChange"><i class="fas fa-arrow-right"></i></button>
                <div>
                    <button class="tool_item"><i class="fas fa-save"></i></button>
                </div>
            </div>
        </div>
    </div>

    <div class="scnt">
        <div class="constructor_area">
            <div class="constructor_page_wrapper">
                <div class="constructor_page_top">
                    <a href="#" class="line_safety">линия безопасности</a>
                </div>
                <div class="constuctor_page__square" >
                    <!-- square lines -->
                    <div class="square__back__lines__cnt">
                        <div class="back__line"></div>
                        <div class="back__line"></div>
                        <div class="back__line"></div>
                        <div class="back__line"></div>
                    </div>
                    <div id="paper" class="constructor__inner__border__cnt" >
                        <div class="printing-body" ref="printMe" :style="[{'background': $root.bgPtrn ? `url(${$root.bgPtrn}) repeat` : `${$root.bgColor || '#ffffff'} url(${$root.bgImg}) 0 0/cover no-repeat`}]">
                            <div key="image-drr">
                                <dr v-for="(value2, k) in $root.inputsArr.img" :key="k" 
                                    :imgSrc="value2.src" 
                                @coordinate="coorStickImg" :coImg="$root.inputsArr.img" :coText="$root.inputsArr.text" :kal="k" ></dr>
                            </div>                            
                            <div key="text-drr">
                                <dr v-for="(value1, ke) in $root.inputsArr.text" :key="ke" 
                                @coordinate="coorStickText" :coText="$root.inputsArr.text" :coImg="$root.inputsArr.img"  :kal="ke" :edit="true">dd</dr>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="constructor_continue">
                    <div class="continue_button" >
                        <a type="#" @click="print">Продолжить</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="side-ctn">
        <div :class="['aside-block', {active: isActive}]"  >
            <div class="aside-active-tab-cnt">
                <component :is="selectedComponent" @addText="pushElement" :lalala="output" @newTemp="newTmplt" ></component>
            </div>
        

            <div class="left_border">
                <button class="toggle-btn" @click="toggleAside">
                    <i :class="[`fas fa-chevron-${!this.isActive ? 'right' :'left'}`]"></i>
                </button>
            </div>
        </div>

        <div class="static-aside-block">
            <ul>
                <li v-for="(value, key) in asideTabs " :key="key"  >
                    <button :class="['tab-btn',`${value.btnClass}`]" @click="openAsideTop(value.name, value.text)" >
                        <i :class="[`fas ${value.icon} `]"></i>
                        <br>
                        <span class="nav-text">
                            {{value.text}}
                        </span>
                    </button>
                </li>
                </ul>
                

            <ul class="bottom">
                <li v-for="(value, key) in bottomTabs" :key="key">
                    <button :class="['tab-btn', `${value.btnClass}`]" @click="openAsideTop(value.name, value.text)">
                        <i :class="[`fas ${value.icon}`]"></i>
                        <br>
                        <span class="nav-text">
                            {{value.text}}
                        </span>
                    </button>
                </li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>

import textTab from './components/text'
import searchTab from './components/search'
import imagesTab from './components/images'
import elementsTab from './components/elements'
import fontTab from './components/font'
import QrCodeTab from './components/qrCode'
import filesTab from './components/files'
import basicsTab from './components/basics'
import templatesTab from './components/templates'
import _ from 'lodash'
export default {
    name: 'app',
    mounted() {
    
        let lastTemplate = localStorage.getItem('template')
        let inputsArr = localStorage.getItem('inputsArr')
        let output = localStorage.getItem('output')
        let bgImg = localStorage.getItem('bgImg')
        let bgColor = localStorage.getItem('bgColor')
        let bgPtrn = localStorage.getItem('bgPtrn')
        if(lastTemplate){
            this.baza = JSON.parse(lastTemplate)
        }
        if(inputsArr){
            this.$root.inputsArr = JSON.parse(inputsArr)
        }
        if(output){
            this.output = output
        }
        if(this.$root.inputsArr.bgColor){
            this.$root.bgColor = this.$root.inputsArr.bgColor
        } else if (bgColor){
            this.$root.bgColor = bgColor
        }
        if(this.$root.inputsArr.bgImg){
            this.$root.bgImg = this.$root.inputsArr.bgImg
        } else if (bgImg){
            this.$root.bgImg = bgImg
        }
        if(this.$root.inputsArr.bgPtrn) {
            this.$root.bgPtrn = this.$root.inputsArr.bgPtrn
        } else if(bgPtrn) {
            this.$root.bgPtrn = bgPtrn
        }
        if (this.$root.inputsArr.text.length) {
            for (let item=0; item < this.$root.inputsArr.text.length; item++) {
                if(!this.baza.template) {
                    this.$set(this.baza, 'template', {})
                }
                if(!this.baza.template.text) {
                    this.$set(this.baza.template, 'text', [])
                }
                if(item < this.baza.template.text.length) {
                    continue
                }
                this.baza.template.text.push({
                    src: this.$root.inputsArr.text[item].src,
                    x: this.$root.inputsArr.text[item].x,
                    y: this.$root.inputsArr.text[item].y,
                    w: this.$root.inputsArr.text[item].w,
                    h: this.$root.inputsArr.text[item].h,
                    angle: this.$root.inputsArr.text[item].angle
                })
            }
        }
        
        if (this.$root.inputsArr.text.length) {
            for (let item=0; item < this.$root.inputsArr.img.length; item++) {
                if(!this.baza.template) {
                    this.$set(this.baza, 'template', {})
                }
                if(!this.baza.template.img) {
                    this.$set(this.baza.template, 'img', [])
                }
                if(item < this.baza.template.img.length) {
                    continue
                }
                this.baza.template.img.push({
                    src: this.$root.inputsArr.img[item].src,
                    x: this.$root.inputsArr.img[item].x,
                    y: this.$root.inputsArr.img[item].y,
                    w: this.$root.inputsArr.img[item].w,
                    h: this.$root.inputsArr.img[item].h,
                    angle: this.$root.inputsArr.img[item].angle
                })
            }
        }
        if(this.baza.template && !this.baza.template.src) {
            this.$set(this.baza.template, 'src', '')
        }

        if(this.baza.template && !this.baza.template.bgColor) {
            this.$set(this.baza.template, 'bgColor', '')
        }

        if(this.baza.template && !this.baza.template.bgImg) {
            this.$set(this.baza.template, 'bgImg', '')
        }

        if(this.baza.template) {
            this.baza.template.bgImg = this.$root.inputsArr.bgImg
            this.baza.template.src = this.output
            this.baza.template.bgColor = this.$root.inputsArr.bgColor
        }
    },
    data(){
        return {
            isActive: false,
            selectedComponent: '',
            componentInput: '',
            coorText: [],
            coorImg: [],
            xNum: 500,
            yNum: 300,
            img: [],
            type:'',
            output: null,
            isActiveEl: {
                img: false,
                text: false
            },
            activeElemType: '',
            activeElemArrIndex: 0,
            asideTabs: [
                {
                    name: 'search-tab', btnClass: 'search-btn', text: 'Search', icon: 'fa-search fa-2x'
                },
                {
                    name: 'text-tab', btnClass: 'text-btn', text: 'textInput', icon: 'fa-text-height fa-2x'
                },
                {
                    name: 'images-tab', btnClass: 'images-btn', text: 'imgInput', icon: 'fa-images fa-2x'
                },
                {
                    name: 'elements-tab', btnClass: 'elements-btn', text: 'elements', icon: 'fa-shapes fa-2x'
                },
                {
                    name: 'font-tab', btnClass: 'Font-btn', text: 'Font', icon: 'fa-fill-drip fa-2x'
                },
                {
                    name: 'Qr-code-tab', btnClass: 'QrCode-btn', text: 'QR-Code', icon: 'fa-qrcode fa-2x'
                },
                {
                    name: 'files-tab', btnClass: 'Files-btn', text: 'Files', icon: 'fa-cloud-upload-alt fa-2x'
                },
            
            ],
            bottomTabs:[
                {
                    name: 'basics-tab', btnClass: 'Basics-btn', text: 'Basics', icon: 'fa-paper-plane fa-2x'
                },
                {
                    name: 'templates-tab', btnClass: 'Templates-btn', text: 'Templates', icon: 'fa-pen-square fa-2x'
                },
            ],

            baza: {
                default: {
                    text: [
                        {src: '123', x: 0, y: 0, angle: 0, w: 0, h: 0}
                    ],  
                    img: [
                        {src: '@/assets/dsd.jpg', x: 1, y: 24, angle: 0, w: 0, h: 0}
                    ]
                },
                'qoraLayout': {
                    text: [
                        {}
                    ],
                    img: [
                        {}
                    ]
                }
            },
            countChange: 0
            
        }
    },
    
components: {
        textTab,
        searchTab,
        imagesTab,
        elementsTab,
        fontTab,
        QrCodeTab,
        filesTab,
        basicsTab,
        templatesTab,
    },


methods: {
    activeEl(type, key) {
        for (let xtype in this.isActiveEl) {
            this.isActiveEl[xtype] = false
        }
        this.isActiveEl[type] = true
        this.activeElemType = type
        this.activeElemArrIndex = key
        console.log(type)
    },

    async print() {

        for (let item=0; item < this.$root.inputsArr.text.length; item++) {
            
            if(!this.baza.template) {
                this.$set(this.baza, 'template', {})
            }

            if(!this.baza.template.text) {
                this.$set(this.baza.template, 'text', [])
            }

            if(item < this.baza.template.text.length) {
                continue
            }

            this.baza.template.text.push({
                src: this.$root.inputsArr.text[item].src,
                x: this.$root.inputsArr.text[item].x,
                y: this.$root.inputsArr.text[item].y,
                w: this.$root.inputsArr.text[item].w,
                h: this.$root.inputsArr.text[item].h,
                angle: this.$root.inputsArr.text[item].angle
            })
        }
        for (let item=0; item < this.$root.inputsArr.img.length; item++) {
            if(!this.baza.template) {
                this.$set(this.baza, 'template', {})
            }

            if(!this.baza.template.img) {
                this.$set(this.baza.template, 'img', [])
            }
            
            if(item < this.baza.template.img.length) {
                continue
            }

            this.baza.template.img.push({
                src: this.$root.inputsArr.img[item].src,
                x: this.$root.inputsArr.img[item].x,
                y: this.$root.inputsArr.img[item].y,
                w: this.$root.inputsArr.img[item].w,
                h: this.$root.inputsArr.img[item].h,
                angle: this.$root.inputsArr.img[item].angle
            })
        }
        
        const el = this.$refs.printMe
        const options = {
            type: 'dataURL'
        }
        let outputlocal = await this.$html2canvas(el, options)
        
        this.output = outputlocal
        let link = document.createElement('a')
        link.href = outputlocal
        link.download= "filename.jpg"
        document.body.appendChild(link)
        link.click()

        localStorage.setItem('output', this.output)

        if(this.baza.template && !this.baza.template.src) {
            this.$set(this.baza.template, 'src', '')
        }
        this.baza.template.src =outputlocal

        if(!this.baza.template.bgColor) {
            this.$set(this.baza.template, 'bgColor', '')
        }
        this.baza.template.bgColor = this.$root.bgColor

        if(!this.baza.template.bgImg) {
            this.$set(this.baza.template, 'bgImg', '')
        }
        this.baza.template.bgImg = this.$root.bgImg

        if(!this.baza.template.bgPtrn) {
            this.$set(this.baza.template, 'bgPtrn', '')
        }
        this.baza.template.bgPtrn = this.$root.bgPtrn
    },

    toggleAside(){
        this.isActive = !this.isActive;
    },
    
    openAsideTop(name, text){
        this.isActive = true;
        this.selectedComponent = name;
        this.componentInput = text;
    },

    pushElement(value, type){
        this.$root.inputsArr[type].push({src:value})
        this.updateLocalStorage()
    },
    updateLocalStorage2() {
        localStorage.setItem('template', JSON.stringify(this.baza))
        localStorage.setItem('inputsArr', JSON.stringify(this.$root.inputsArr))
    },
    updateLocalStorage: _.debounce(function() {

        this.$root.inputsArr.bgImg = this.$root.bgImg
        this.$root.inputsArr.bgColor = this.$root.bgColor
        this.$root.inputsArr.bgPtrn = this.$root.bgPtrn
        localStorage.setItem('template', JSON.stringify(this.baza))
        localStorage.setItem('inputsArr', JSON.stringify(this.$root.inputsArr)) 
        
        const clone = _.cloneDeep(this.$root.inputsArr)
        console.log('oldInputs before', clone)
        // Har o'zgarishni arrayga qowiw
        this.$root.sequenceOfChange = [
            clone,
            ...this.$root.sequenceOfChange
        ]
        
        console.log(this.$root.sequenceOfChange)
        // console.log('cloning', this.$root.sequenceOfChange)
        // const clone = {...this.$root.inputsArr}
        // // Har o'zgarishni arrayga qowiw
        // this.$root.sequenceOfChange.push(clone)
        // console.log('reSet init', this.$root.sequenceOfChange)
    }, 300),
    coorStickText(x,y,k,w,h,angle,src){
        this.$root.inputsArr.text[k]={x:x,y:y,w:w,h:h,angle:angle,src:src}
        this.updateLocalStorage()
    },

    coorStickImg(x,y,k,w,h,angle,src){
        this.$root.inputsArr.img[k]={x:x,y:y,w:w,h:h,angle:angle,src:src}
        this.updateLocalStorage()
    },

    newTmplt(tempImgSrc) {
        console.log(1)
        this.$root.inputsArr = []
        
        for(let item in this.baza) {
            console.log(2)
            if(this.baza[item].src == tempImgSrc) {
                if(!this.baza[item].text) {
                    this.$set(this.baza[item], 'text', [])
                }
                if(!this.baza[item].img) {
                    this.$set(this.baza[item], 'img', [])
                }
                this.$root.inputsArr = this.baza[item]
                this.baza[item] = {}
                this.updateLocalStorage()
                location.reload()
            }
        }
    },
    backChange () {
        this.$root.inputsArr = _.cloneDeep(this.$root.sequenceOfChange[++this.countChange])
        console.log(this.$root.sequenceOfChange[this.countChange])

        // for( let item in this.$root.sequenceOfChange[++this.countChange]) {
        //     let cloneItem = _.cloneDeep(item)
        //     this.$root.inputsArr = {
        //         ...this.$root.inputsArr,
        //         item
        //     }
        // }
        this.$root.bgImg = this.$root.inputsArr.bgImg
        this.$root.bgColor = this.$root.inputsArr.bgColor
        this.$root.bgPtrn = this.$root.inputsArr.bgPtrn
        console.log('back change', this.$root.sequenceOfChange[this.countChange])
        this.updateLocalStorage2()
    },
    frontChange() {
        this.$root.inputsArr = this.$root.sequenceOfChange[--this.countChange]
        console.log('front change', this.$root.sequenceOfChange[this.countChange])
        this.updateLocalStorage2()
    }
},
computed: {
    giveBackColor() {
        console.log(this.$backColor, 'asasas')
        return this.$backColor
    }
},

}
</script>

<style>
*{
    user-select: none;
}
.hori{
    border-top: 2px dashed;
    width: 100%;
    position: absolute;
}
.printing-body {
    position: absolute;
    width: 800px;
    height: 500px;
    border: 8px solid #ccc;
    overflow: hidden;
}
.continue_button{
    cursor: pointer;
}
.continue_button a{
    width: 100%;
    font-size: 20px;
    background: transparent;
    display: inline-block;
    line-height: 38px;
    text-transform: uppercase;
    font-weight: bold;
    color: #fff;
    padding: 0 20px;
    -webkit-transition: all .5s ease-out;
    transition: all .5s ease-out;
}
</style>
