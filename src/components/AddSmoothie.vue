<template>
	<div class="add-smoothie container">
		<h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
		<form @submit.prevent='addSmoothie'>
			<div class="field title">
				<label for="title">Smoothie title</label>
				<input type="text" name="title" v-model="title" autocomplete="off">
			</div>
			<div v-for="(ing, index) in ingredients" :key="index" class="field">
				<label for="ingredient">ingredient</label>
				<input type="text" name="ingredient" v-model="ingredients[index]">
				<i @click="deleteIng(ing)" class="material-icons delete">delete</i>
			</div>
			<div class="field add-ingredient">
				<label for="add-ingredient">Add an ingredient</label>
				<input type="text" name="add-ingredient" autocomplete="off" @keydown.tab.prevent="addIng" v-model="another">
			</div>
			<div class="field center-align">
				<p v-if="feedback" class="red-text">{{ feedback }}</p>
				<button class="btn pink">Add Smoothie</button>
			</div>
		</form>
	</div>

</template>
<script>
// npm i slugify - специальная библиотека для создания слагов
import slugify from 'slugify'
import db from '../firebase/init'
export default {
	name: 'AddSmoothie', 
	data() {
		return {
			title: null,
			another: null,
			ingredients: [],
			feedback: '',
			slug: null
		}
	},
	methods: {
		addSmoothie(){
			if(this.title){
				this.feedback = null
				// create slug
				this.slug = slugify(this.title, {
					replacemnt: '-',
					remove: /[$*_+~.()'"!\-:@]/g, // просто убираем все эти штуки из слага, если они есть в тайтл
					// даже кириллицу умеет транслитировать)
					lower: true
				})
				db.collection('smoothies').add({
					title: this.title,
					ingredients: this.ingredients,
					slug: this.slug
				}).then(() => {
					this.$router.push({name: 'Index'})
				}).catch(err => console.log(err))
			} else {
				this.feedback = 'You must enter a smoothie title'
			}
		},
		addIng(){
			if(this.another) {
				this.ingredients.push(this.another)
				this.another = null
				this.feedback = null
			} else {
				this.feedback = 'You must enter a value to add a ingredient'
			}
		},
		deleteIng(ingredient){
			this.ingredients = this.ingredients.filter(ing => ing != ingredient)
		}
	}
}
</script>
<style>
	.add-smoothie{
		margin-top: 60px;
		padding: 20px;
		max-width: 500px;
	}
	.add-smoothie h2{
		font-size: 2em;
		margin: 20px auto;
	}
	.add-smoothie .title{
		margin: 20px auto;
	}
	.add-smoothie .field{
		position: relative;
	}
	.add-smoothie .delete{
		position: absolute;
		bottom: 16px;
		right: 0;
		font-size: 1.4em;
		cursor: pointer;
		color:#aaa;
	}
</style>