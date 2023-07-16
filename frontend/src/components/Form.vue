<script setup lang="ts">
    import {ref, type Ref} from "vue"
    import axios from 'axios';
    import Button from "./Button.vue";
    import type { MovieFormProps } from "@/type";
    import { PORT } from "@/func/const";
    import Toast from "./Toast.vue";
import { secureNumber } from "@/func/utils";

    const notation = ref([false,false,false,false,false])
    const toast = ref({
        text       : "",
        type       : "",
        visibility : false,
    })
    const opacityToast = ref(0)
    let movie:Ref<MovieFormProps>  = ref({
        titre : "",
        année : "",
        note : "",
    })

    const emit = defineEmits(["newMovie"])

    const onSubmit = async ()=>{
        
        if(secureNumber(movie.value.année)){
            try {
                const res = await fetch(`http://localhost:${PORT}/post`,{
                    method : "POST",
                    headers: { "Content-Type": "application/json" },
                    body : JSON.stringify({
                        titre :movie.value.titre,
                        année : parseInt(movie.value.année),
                        note : parseInt(movie.value.note)
                    })     
                })
                const result = await res.json();
                if(result.type==="error"){
                    toast.value={ 
                    text       : result.error,
                    type       : "error",
                    visibility : true,
                    }
                    setTimeout(()=>{
                        opacityToast.value=1
                        setTimeout(()=>{
                            opacityToast.value=0
                            setTimeout(()=>{
                                toast.value={ 
                                    text       : "",
                                    type       : "",
                                    visibility : false,
                                }
                            },1000)
                        },2000)
                    },10)
                    return;

                }

                
                emit("newMovie")
                console.log("Success:", result);
                toast.value={ 
                    text       : "film ajouté",
                    type       : "success",
                    visibility : true,
                }
                setTimeout(()=>{
                    opacityToast.value=1
                    setTimeout(()=>{
                        opacityToast.value=0
                        setTimeout(()=>{
                            toast.value={ 
                                text       : "",
                                type       : "",
                                visibility : false,
                            }
                        },1000)
                    },2000)
                },10)
            }
            catch (err) {
                console.error("Error:", err);
                
            }  
        }else {
            toast.value={ 
                text       : "la date doit etre un nombre !",
                type       : "error",
                visibility : true,
            }
            setTimeout(()=>{
                opacityToast.value=1
                setTimeout(()=>{
                    opacityToast.value=0
                    setTimeout(()=>{
                        toast.value={ 
                            text       : "",
                            type       : "",
                            visibility : false,
                        }
                    },1000)
                },2000)
            },10)
        }
    }
    const onClickValue = (number:number)=>{
        movie.value.note=number.toString()
            for(let k = 0; k<5;k++){
                if(k<number){
                    notation.value[k]=true  
                            
                }
                else{
                    notation.value[k]=false
                }
            }
            console.log(notation.value)
        }
        




</script>

<template>
    <div class="form"
    >
        <div>
            <input class="input-form" name="titre" placeholder="titre..." v-model="movie.titre" maxlength="25" />
        </div>
        <div>
            <input class="input-form" name="année" placeholder="année..." v-model="movie.année" maxlength="5"  />
        </div>
        <div style="display: flex;justify-content: center;">
           <div style="display: flex;gap: 10px;">
            <div @click="onClickValue(1)" :style="{width: '20px' ,height: '20px', borderRadius: '100px', backgroundColor: `${notation[0]===true?'gold':'white'}`}"></div>
            <div @click="onClickValue(2)" :style="{width: '20px' ,height: '20px', borderRadius: '100px', backgroundColor: `${notation[1]===true?'gold':'white'}`}"></div>
            <div @click="onClickValue(3)" :style="{width: '20px' ,height: '20px', borderRadius: '100px', backgroundColor: `${notation[2]===true?'gold':'white'}`}"></div>
            <div @click="onClickValue(4)" :style="{width: '20px' ,height: '20px', borderRadius: '100px', backgroundColor: `${notation[3]===true?'gold':'white'}`}"></div>
            <div @click="onClickValue(5)" :style="{width: '20px' ,height: '20px', borderRadius: '100px', backgroundColor: `${notation[4]===true?'gold':'white'}`}"></div>
        </div> 
        </div>
        
        <div class="valide-button">
           
        
            <Button style=" background-color: var(--last-color);" text="valider" @click="onSubmit"></Button>
        </div>
       
    </div>
    <div  v-if="toast.visibility" class ="toast-container-alert" :style="{opacity : `${opacityToast}`}">
    
    <Toast  :text="toast.text" :type="toast.type"></Toast>
    </div>
   

</template>

<style>
    .form{
        display: flex;
        flex-direction: column;
        background-color: var(--second-color);
        border-radius: 20px;
        padding: 20px;
        gap: 20px;
    }
    .valide-button{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .input-form {
        height: 50px;
        width: 300px;
    }
    .toast-container-alert{
        transition: opacity 330ms ease-in-out ;
        display: flex;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100vi;
        justify-content: center; 
    }

</style>