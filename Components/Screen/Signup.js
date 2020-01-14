import React from 'react';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import * as Permissions from 'expo-permissions';

import {
	ScrollView,
	Picker,
	View,
	Button,
	Text,
	TextInput,
	Alert,
	KeyboardAvoidingView,
	StyleSheet,
	Image,
} from 'react-native';

// import of my ip config
import url from '../../config';

class Signup extends React.Component {
	constructor() {
		super();
		this.handleSumbit = this.handleSumbit.bind(this);
		this.state = {
			username: '',
			email: '',
			password: '',
			dog1: '',
			dog1gender: '',
			avatar: null,
			permision: null,
			image: null,
		};
	}
	_pickImage = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
		var permision = status === 'granted' ? true : false;
		this.setState({ permision });

		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3],
		});

		// console.log(result);

		if (!result.cancelled) {
			this.setState({ image: result.uri });

			var data = new FormData();

			data.append('avatar', {
				uri: this.state.image,
				type: 'image/jpeg',
				name: 'user_avatar.jpg',
			});

			const ctx = this;

			await fetch(`${url}/upload`, {
				method: 'post',
				body: data,
			})
				.then(function(res, err) {
					return res.json();
				})
				.then(function(data) {
					ctx.setState({ avatar: data });
				})
				.catch(function(err) {
					console.log(err);
				});
		}
	};

	handleSumbit() {
		console.log('signup from front handled...');

		var signupData = JSON.stringify({
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
			dog1: this.state.dog1,
			dog1gender: this.state.dog1gender,
			avatar: this.state.avatar,
		});

		// Since we are going to fetch with the ES5 syntax, we need to store this (an EST5 function has got its own this)
		const ctx = this;

		fetch(`${url}/signup`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: signupData,
		})
			.then(function(res, err) {
				return res.json();
			})
			.then(function(data) {
				console.log(data);
				ctx.props.handleUserValid(
					data.user._id,
					data.user.username,
					data.user.email,
					data.user.dog1,
					data.user.dog1gender,
					data.user.avatar,
					data.user.token
				);
				AsyncStorage.setItem('userComeback', JSON.stringify(data));

				ctx.props.navigation.navigate('Mon compte');
			})
			.catch(function(err) {
				console.log(err);
			});
	}

	render() {
		let { image } = this.state;
		const options = [
			{ value: 'female', label: 'female' },
			{ value: 'male', label: 'male' },
		];
		return (
			<KeyboardAvoidingView style={styles.containerView} behavior='padding'>
				{/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
				<View style={styles.loginScreenContainer}>
					<Image source={require('../../assets/Images/dogo.png')} style={styles.logo} />

					<ScrollView style={styles.loginFormView}>
						<Text style={styles.logoText}>Sign up</Text>
						<TextInput
							placeholder='Username'
							onChangeText={e => this.setState({ username: e })}
							placeholderColor='#c4c3cb'
							style={styles.loginFormTextInput}
						/>
						<TextInput
							placeholder='Email'
							onChangeText={e => this.setState({ email: e })}
							placeholderColor='#c4c3cb'
							style={styles.loginFormTextInput}
						/>
						<TextInput
							placeholder='Password'
							onChangeText={e => this.setState({ password: e })}
							placeholderColor='#c4c3cb'
							style={styles.loginFormTextInput}
							secureTextEntry={true}
						/>
						<TextInput
							placeholder="Dog's Name"
							onChangeText={e => this.setState({ dog1: e })}
							placeholderColor='#c4c3cb'
							style={styles.loginFormTextInput}
						/>

						<Text
							style={{
								height: 43,
								fontSize: 14,
								paddingLeft: 10,
								color: '#778ca3',
								marginTop: 15,
								color: '#778ca3',
							}}
						>
							Dog's gender:{' '}
						</Text>

						<Picker
							style={{ width: 290, height: 88 }}
							itemStyle={{ color: '#778ca3', height: 44 }}
							selectedValue={this.state.dog1gender}
							onValueChange={(itemValue, itemIndex) => this.setState({ dog1gender: itemValue })}
						>
							<Picker.Item label='male' value='male' />
							<Picker.Item label='female' value='female' />
						</Picker>

						<View style={{ alignItems: 'center', justifyContent: 'center' }}>
							<Button color='#841584' title='Ajouter une photo de ton chien' onPress={this._pickImage} />
							{image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
						</View>
						<Button buttonStyle={styles.loginButton} onPress={this.handleSumbit} title='Sign Up' />

						<Button
							buttonStyle={styles.fbLoginButton}
							onPress={() => this.props.navigation.navigate('Signin')}
							title='Deja un compte? Sign in'
							color='#3897f1'
						/>
					</ScrollView>
				</View>

				{/* </TouchableWithoutFeedback> */}
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	containerView: {
		flex: 1,
	},
	loginScreenContainer: {
		flex: 1,
		alignItems: 'center',
	},
	logoText: {
		fontSize: 30,
		fontWeight: '200',
		marginTop: 50,
		marginBottom: 20,
		textAlign: 'center',
		color: '#778ca3',
	},
	logo: {
		height: 83,
		width: 210,
		marginTop: 50,
	},
	loginFormView: {
		flex: 1,
	},
	loginFormTextInput: {
		height: 43,
		fontSize: 14,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#eaeaea',
		backgroundColor: '#fafafa',
		paddingLeft: 10,
		color: '#778ca3',
		marginTop: 5,
		marginBottom: 5,
	},
	loginButton: {
		color: '#778ca3',
		borderRadius: 5,
		margin: 20,
		height: 45,
	},
});

function mapDispatchToProps(dispatch) {
	return {
		handleUserValid: function(idUser, nameUser, emailUser, dog1User, dog1genderUser, avatarUser, tokenUser) {
			dispatch({
				type: 'setUser',
				userId: idUser,
				name: nameUser,
				email: emailUser,
				dog1: dog1User,
				dog1gender: dog1genderUser,
				avatar: avatarUser,
				token: tokenUser,
			});
		},
	};
}

export default connect(null, mapDispatchToProps)(Signup);
