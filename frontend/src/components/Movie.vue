<script setup lang="ts">
    import { ref, type Ref } from 'vue';
    import Button from "./Button.vue";
    import type { MovieFormProps } from '@/type';
    import { PORT } from '@/func/const';
    import { Trash2 } from 'lucide-vue-next';
    const y = ref(200)
    const deleteToast = ref(false)
    const notation = ref([false,false,false,false,false])
    
    const newMovie:Ref<MovieFormProps> = ref({
        titre : "",
        année : "",
        note : ""
    }) 

    const emit = defineEmits(["emitUpdate"])

    const props = defineProps(["title","date","note","id","movie"])
  
    const onHover = ()=>{
        y.value=130
    }
    const onLeave = ()=>{
        y.value=200
    }
    const onDeleteToast = () =>{
        y.value = -200
        deleteToast.value =true
    }
    const onChangeForm = ()=>{
        y.value = -200
        deleteToast.value =false
    }
    const onDelete = async (id:string)=>{
        try {
            const res = await fetch(`http://localhost:${PORT}/post/${id}`,{
                method : "DELETE"
            })
            const result = await res.json()
            emit("emitUpdate")
            y.value=130
        } catch (error) {
            console.log(error)
        }
    }
    const onSubmit = async (id:string) =>{
        try {
            const res = await fetch(`http://localhost:${PORT}/post/${id}`,{
                method : "PUT",
                headers: { "Content-Type": "application/json" },
                body : JSON.stringify({
                    titre : newMovie.value.titre,
                    année : parseInt(newMovie.value.année),
                    note : parseInt(newMovie.value.note)
                })     
            })
            const result = await res.json()
            emit("emitUpdate")
            y.value=130
        } catch (error) {
            console.log(error)
        }
    }
    const onClickValue = (number:number)=>{
        newMovie.value.note=number.toString()
        for(let k = 0; k<5;k++){
            if(k<number){
                notation.value[k]=true  
                        
            }
            else{
                notation.value[k]=false
            }
        }
    }
    
</script>

<template>
    <div @mouseenter="onHover" @mouseleave="onLeave" class="movie-container">
        <div class="movie-info">
            <div >
                <h1 style="text-align: center;" >{{ props.title }}</h1>
            </div>
            <div>
                date : {{ props.date}}
            </div>  
            <div style="display: flex;gap: 10px;">
                <div  :style="{width: '20px' ,height: '20px', borderRadius: '100px', backgroundColor: `${props.note>=1?'gold':'white'}`}"></div>
                <div  :style="{width: '20px' ,height: '20px', borderRadius: '100px', backgroundColor: `${props.note>=2?'gold':'white'}`}"></div>
                <div  :style="{width: '20px' ,height: '20px', borderRadius: '100px', backgroundColor: `${props.note>=3?'gold':'white'}`}"></div>
                <div  :style="{width: '20px' ,height: '20px', borderRadius: '100px', backgroundColor: `${props.note>=4?'gold':'white'}`}"></div>
                <div  :style="{width: '20px' ,height: '20px', borderRadius: '100px', backgroundColor: `${props.note>=5?'gold':'white'}`}"></div>
            </div>
           
        </div>
        <div :style="{transform : `translate(0px,${y}px)` }" class="footer-film-container">
            <div class="footer-film">
                <div class="footer-button-container">
                     <button class="button-footer" @click="onChangeForm">changer</button>
                    <button class="button-footer" @click="onDeleteToast">
                        <Trash2  :size="40"></Trash2>
                    </button> 
                </div>
              
                <div v-if="deleteToast" class="toast">
                    <p>Etes-vous sûr de vouloir supprimer ?</p>
                    <div class="verif-button-container">
                        <button class="verif-button" @click="onHover" >non</button>
                        <button class="verif-button" @click="onDelete(props.id)">
                            oui
                        </button> 
                    </div>
                </div>
                <div v-else class="toast">
                    <div style="display: flex;flex-direction: column;width: 100%; height: 100%; align-items: center; justify-content: end; gap: 10px;">
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            <label style="text-align: start; color:var(--first-color)" for="titre">titre : {{ title }}</label> 
                            <input style="border-radius: 5px; height: 30px;" class="input-form-movie"   name="titre" placeholder="titre..." v-model="newMovie.titre" maxlength="25" />
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            <label  style="text-align: start;color:var(--first-color)" for="année">date : {{ date }}</label> 
                            <input style="border-radius: 5px; height: 30px;" class="input-form-movie" name="année" placeholder="année..." v-model="newMovie.année" maxlength="5" />
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            <div style="display: flex;gap: 10px;">
                                <div @click="onClickValue(1)" :style="{width: '20px' ,height: '20px', borderRadius: '100px', backgroundColor: `${notation[0]===true?'gold':'white'}`}"></div>
                                <div @click="onClickValue(2)" :style="{width: '20px' ,height: '20px', borderRadius: '100px', backgroundColor: `${notation[1]===true?'gold':'white'}`}"></div>
                                <div @click="onClickValue(3)" :style="{width: '20px' ,height: '20px', borderRadius: '100px', backgroundColor: `${notation[2]===true?'gold':'white'}`}"></div>
                                <div @click="onClickValue(4)" :style="{width: '20px' ,height: '20px', borderRadius: '100px', backgroundColor: `${notation[3]===true?'gold':'white'}`}"></div>
                                <div @click="onClickValue(5)" :style="{width: '20px' ,height: '20px', borderRadius: '100px', backgroundColor: `${notation[4]===true?'gold':'white'}`}"></div>
                            </div>
                        </div>
                        <div class="valide-button">   
                            <Button style="background-color: var(--last-color);" text="valide" @click="onSubmit(props.id)"></Button>
                        </div>   
                    </div>
                </div>
            </div>  
        </div>
        
    </div>
 
   

</template>

<style>
    .movie-container{
        overflow: hidden;
    } 
    .movie-container:hover{
        scale: 0.95;
    }
    .movie-info{
        color: var(--first-color);
        font-size: larger;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 10px solid var(--first-color);
        border-radius: 20px;
        background-color: var(--second-color);
        width: 200px;
        height: 300px;
      
        gap: 10px;
    }
 
    .footer-film-container{
        display: flex;
       
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: transform 330ms ease-in-out;
    }
    .footer-film{
        position: absolute;
        display: flex;
        flex-direction: column;
        width: 200px;
        height:400px;
        background-color: var(--second-color);
    }
    .button-footer{
        font-size: x-large;
        height: 74px;
        width: 50%;
        background-color:  var(--second-color);
        border: 1px solid var(--first-color);
   
    }
    .footer-button-container{
        display: flex;
        
    }
    .toast{
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        align-items: center;
        height: 100%;
    }
    .verif-button-container{
        display: flex;
        gap: 20px;
    }
    .verif-button{
        background-color: var(--last-color);
        border: 0;
        border-radius: 10px;
        padding: 20px;
        display: flex;
        gap: 20px;

    }
   

</style>

