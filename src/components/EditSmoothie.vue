<template>
	<div v-if="smoothie" class="edit-smoothie container">
		<h2>Edit Smoothie named {{ smoothie.title }}</h2>
		<form @submit.prevent="editSmoothie">
			<div class="field title">
				<label for="title">Smoothie title</label>
				<input type="text" name="title" v-model="smoothie.title" autocomplete="off">
			</div>
			<div v-for="(ing, index) in smoothie.ingredients" :key="index" class="field">
				<label for="ingredient">ingredient</label>
				<input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
				<i @click="deleteIng(ing)" class="material-icons delete">delete</i>
			</div>
			<div class="field edit-ingredient">
				<label for="edit-ingredient">edit an ingredient</label>
				<input type="text" name="edit-ingredient" autocomplete="off" @keydown.tab.prevent="editIng" v-model="another">
			</div>
			<div class="field center-align">
				<p v-if="feedback" class="red-text">{{ feedback }}</p>
				<button class="btn pink">Update Smoothie</button>
			</div>
		</form>
	</div>
	
</template>
<script>
import db from '../firebase/init'
import slugify from 'slugify'
export default {
	name: 'EditSmoothie',
	data(){
		return {
			smoothie: null,
			another: null,
			feedback: null
		}
	},
	methods: {
		editIng(){
			if(this.another) {
				this.smoothie.ingredients.push(this.another)
				this.another = null
				this.feedback = null
			} else {
				this.feedback = 'You must enter a value to add a ingredient'
			}
		},
		deleteIng(ingredient){
			this.smoothie.ingredients = this.smoothie.ingredients.filter(ing => ing != ingredient)
		},
		editSmoothie(){
			if(this.smoothie.title){
				this.feedback = null
				// create slug
				this.smoothie.slug = slugify(this.smoothie.title, {
					replacemnt: '-',
					remove: /[$*_+~.()'"!\-:@]/g, // просто убираем все эти штуки из слага, если они есть в тайтл
					// даже кириллицу умеет транслитировать)
					lower: true
				})
				db.collection('smoothies').doc(this.smoothie.id).update({
					title: this.smoothie.title,
					ingredients: this.smoothie.ingredients,
					slug: this.smoothie.slug
				}).then(() => {
					this.$router.push({name: 'Index'})
				}).catch(err => console.log(err))
			} else {
				this.feedback = 'You must enter a smoothie title'
			}
		},
	},
	created(){
		db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug).get()
			.then(snapshot => snapshot.forEach(doc => {
				this.smoothie = doc.data()
				this.smoothie.id = doc.id // id не находится в data
			}))
			.catch(err => console.log(err))
	},
}
</script>
<style>
	.edit-smoothie{
		margin-top: 60px;
		padding: 20px;
		max-width: 500px;
	}
	.edit-smoothie h2{
		font-size: 2em;
		margin: 20px auto;
	}
	.edit-smoothie .title{
		margin: 20px auto;
	}
	.edit-smoothie .field{
		position: relative;
	}
	.edit-smoothie .delete{
		position: absolute;
		bottom: 16px;
		right: 0;
		font-size: 1.4em;
		cursor: pointer;
		color:#aaa;
	}
</style>