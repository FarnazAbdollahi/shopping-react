import React from 'react'
import Input from '../../components/UI/Input/Input'
import './Account.css'
import axios from '../../axios-orders'



class Account extends React.Component {
    state = {
        signupForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'نام و نام خانوادگی ...',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                used: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ایمیل ...',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                used: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'رمز عبور ...',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                used: false,
            },
        },
        signinForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ایمیل ...',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                used: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'رمز عبور ...',
                },
                value: '',
                validation: {
                    required: true,
                },

            },
        },
    }

    signupSubmitHandler = (event) => {
        event.preventDefault()

        const formData = {}

        for (let item in this.state.signupForm) {
            formData[item] = this.state.signupForm[item].value
        }

        axios
            .post('/account.json', formData)
            .then((response) => {
                document.getElementById("signupForm").innerHTML = "عضویت با موفقیت انجام شد"
            })
            .catch((error) => {
                console.log(error)
            })
    }
    signinSubmitHandler = (event) => {
        let account = this.state.signinForm
        event.preventDefault()
        axios
            .get('https://main-shop-react.firebaseio.com/account.json')
            .then((response) => {
                let accData = Object.values(response.data)

                let findItem = Object.values(accData).filter((item) => {
                    if (account.email.value === item.email) {
                        return item
                    }

                })
                console.log(findItem)
                console.log(account.password.value)
                if (findItem[0].password === account.password.value) {
                    document.getElementById("signinForm").innerHTML = "ورود با موفقیت انجام شد"
                }
                else {
                    document.getElementById("signinForm").innerHTML = "ورود ناموفق : رمز عبور اشتباه یا عدم عضویت با ایمیل مذبور"
                }


            }
            )
            .catch((error) => {
                console.log(error)
            })
    }
    checkValidation = (value, rules) => {
        let isValid = false

        if (rules.required) {
            isValid = value.trim() !== ''
        }

        return isValid
    }

    signinInputChangeHandler = (event, inputElement) => {
        const updatedForm = {
            ...this.state.signinForm,
        }
        const updatedElement = { ...updatedForm[inputElement] }

        updatedElement.value = event.target.value

        updatedElement.valid = this.checkValidation(
            updatedElement.value,
            updatedElement.validation
        )

        updatedElement.used = true

        updatedForm[inputElement] = updatedElement

        this.setState({ signinForm: updatedForm })
    }

    signupInputChangeHandler = (event, inputElement) => {
        const updatedForm = {
            ...this.state.signupForm,
        }
        const updatedElement = { ...updatedForm[inputElement] }

        updatedElement.value = event.target.value

        updatedElement.valid = this.checkValidation(
            updatedElement.value,
            updatedElement.validation
        )

        updatedElement.used = true

        updatedForm[inputElement] = updatedElement

        this.setState({ signupForm: updatedForm })
    }
    render() {
        const signupElementsArray = []

        for (let item in this.state.signupForm) {
            signupElementsArray.push({
                id: item,
                config: this.state.signupForm[item],
            })
        }

        const signinElementsArray = []

        for (let item in this.state.signinForm) {
            signinElementsArray.push({
                id: item,
                config: this.state.signinForm[item],
            })
        }
        return (
            <React.Fragment>
                <h2>حساب کاربری</h2>
                <div className="account">
                    <div className="forms">
                        <h3>ورود</h3>
                        <form id="signinForm" onSubmit={this.signinSubmitHandler}>
                            {signinElementsArray.map((item) => {
                                return (
                                    <Input
                                        key={item.id}
                                        elementType={item.config.elementType}
                                        elementConfig={item.config.elementConfig}
                                        value={item.config.value}
                                        invalid={!item.config.valid}
                                        used={item.config.used}
                                        change={(event) => this.signinInputChangeHandler(event, item.id)}
                                    />
                                )
                            })}
                            <button className="login-btn">ورود</button>
                        </form>
                    </div>
                    <div className="forms"  >
                        <h3 >عضویت</h3>
                        <form id="signupForm" onSubmit={this.signupSubmitHandler}>
                            {signupElementsArray.map((item) => {
                                return (
                                    <Input
                                        key={item.id}
                                        elementType={item.config.elementType}
                                        elementConfig={item.config.elementConfig}
                                        value={item.config.value}
                                        invalid={!item.config.valid}
                                        used={item.config.used}
                                        change={(event) => this.signupInputChangeHandler(event, item.id)}
                                    />
                                )
                            })}
                            <button className="login-btn">عضویت</button>
                        </form>
                    </div>

                </div>
            </React.Fragment>
        )
    }
}
export default Account
