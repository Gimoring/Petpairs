import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import styles from '../styles/card.module.scss';

const db = [
	{
		id: 2,
		petName: '사슴이된성민G',
		age: 88,
		breed: '시츄',
		species: ['강아지'],
		fileName:
			'https://images.pexels.com/photos/7853223/pexels-photo-7853223.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
		matchedId: [5],
	},
	{
		id: 3,
		petName: '혼란을틈탄여자',
		age: 82,
		breed: '고양이',
		species: ['고양이'],
		fileName:
			'https://images.pexels.com/photos/5428550/pexels-photo-5428550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
		matchedId: [6],
	},
	{
		id: 4,
		petName: '강아지가된엄호태',
		age: 818,
		breed: '시츄',
		species: ['강아지'],
		fileName:
			'https://images.pexels.com/photos/7098011/pexels-photo-7098011.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
		matchedId: [1],
	},
];

const PetCards = () => {
	const [pets, setPets] = useState(db);
	return (
		<>
			{pets.map((pet) => (
				<TinderCard
					className={styles.swipe}
					key={pet.petName}
					preventSwipe={['up', 'down']}
				>
					<div
						className={styles.card}
						style={{ backgroundImage: `url(${pet.fileName})` }}
					>
						<h2>
							{pet.petName} {pet.age}세
						</h2>
						<p>소개글입니다 나는 동물입니다</p>
					</div>
				</TinderCard>
			))}
		</>
	);
};

export default PetCards;
