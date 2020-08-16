import React, {Component} from 'react';
import {Formik} from "formik";
import * as Yup from "yup";
import FormEmailInputComponent from "../Inputs/FormEmailInputComponent";
import Loading from "../../Loading";
import FormTextInputComponent from "../Inputs/FormTextInputComponent";
import FormTextAreaInputComponent from "../Inputs/FormTextAreaInputComponent";
import FormPhoneInputComponent from "../Inputs/FormPhoneInputComponent";
import FormNumUnityInputComponent from "../Inputs/FormNumUnityInputComponent";
import FormSelectInputComponent from "../Inputs/FormSelectInputComponent";

const ValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Le nom complet doit comporter entre 2 et 30 caractères !')
        .max(50, 'Le nom complet doit comporter entre 2 et 30 caractères !')
        .required('Le nom complet est requis !'),
    description: Yup.string()
        .min(10, 'La description doit comporter entre 10 et 320 caractères !')
        .max(320, 'La description doit comporter entre 100 et 320 caractères !')
        .required('La description  est requise !'),
    email: Yup.string()
        .email('L\'email entré doit être une adresse email valide !'),
    phone: Yup.string()
        .required('Le téléphone est requis !'),
    prix: Yup.number()
        .min(10, 'Le prix doit être compris entre 10€ et 320€ !')
        .max(320, 'Le prix doit être compris entre 10€ et 320€ !')
        .required('Le prix doit est requis !'),
    subject: Yup.string()
        .required("Le sujet de votre demande est requis !"),
});

class FormTestComponent extends Component {

    state = {
        loading: false,
        success: false
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{padding: 20, width: '100%'}}>
                <Formik
                    initialValues={{name: '', description: '', email: '', phone: '', prix: 0, subject: ''}}
                    onSubmit={(values, actions) => {
                        console.log(values);
                        this.setState({loading: true});
                        // On Done
                        actions.setSubmitting(false);
                        this.setState({loading: false, success: true});
                        // On Error
                        this.setState({loading: false});
                        actions.setSubmitting(false);
                        actions.setStatus({msg: "Une erreur s'est produite, veuillez réessayer !"});
                    }}
                    validationSchema={ValidationSchema}
                    render={({
                                 values,
                                 errors,
                                 status,
                                 touched,
                                 handleBlur,
                                 handleChange,
                                 handleSubmit,
                                 isSubmitting,
                                 setFieldValue
                             }) => (
                        <form onSubmit={handleSubmit}>
                            {this.state.success ? (
                                <article className="message is-success mt-10 mb-30">
                                    <div className="message-header">
                                        <p style={{marginTop: 0, color: '#fff'}}>Bonjour</p>
                                        <button className="delete" aria-label="delete"/>
                                    </div>
                                    <div className="message-body">
                                        Vous avez reçu un code par email, veuillez entrer ce code pour vous connecter.
                                    </div>
                                </article>
                            ) : this.state.loading ? (
                                <Loading/>
                            ) : (
                                <div>
                                    {status && status.msg && <article className="message is-danger mt-10 mb-30">
                                        <div className="message-header">
                                            <p style={{marginTop: 0, color: '#fff'}}>Erreur</p>
                                            <button className="delete" aria-label="delete"/>
                                        </div>
                                        <div className="message-body">
                                            {status.msg}
                                        </div>
                                    </article>}

                                    <FormTextInputComponent label={"Prénom"} element={"name"} placeholder={"Jean Dupond"} icon={"fas fa-user"} errors={errors} values={values} touched={touched} handleBlur={handleBlur} handleChange={handleChange}/>

                                    <FormTextAreaInputComponent label={"Description"} element={"description"} placeholder={"Description..."} rows={10} errors={errors} values={values} touched={touched} handleBlur={handleBlur} handleChange={handleChange}/>

                                    <FormEmailInputComponent label={"Email"} element={"email"}
                                                             placeholder={"client@email.fr"} icon={"fas fa-envelope"}
                                                             errors={errors} values={values} touched={touched}
                                                             handleBlur={handleBlur} handleChange={handleChange}/>

                                    <FormPhoneInputComponent label={"Numéro de téléphone"} element={"phone"} placeholder={"+3378367365"} icon={"fas fa-phone"} errors={errors} values={values} touched={touched} handleBlur={handleBlur} handleChange={handleChange}/>

                                    <FormNumUnityInputComponent unity="€" label={"Prix"} element={"prix"}
                                                                placeholder={"120000"} min={1} max={10000000} step={1}
                                                                icon={"fas fa-money-bill"} errors={errors} values={values}
                                                                touched={touched} handleBlur={handleBlur} handleChange={handleChange}/>

                                    <FormSelectInputComponent label={"Sujet"} element={"subject"} placeholder={"-- Choisir --"} options={[
                                        {
                                            key: "Test",
                                            label: "test"
                                        },
                                        {
                                            key: "Test 2#",
                                            label: "test2"
                                        },
                                        {
                                            key: "Autre...",
                                            label: "Autre..."
                                        }
                                    ]} errors={errors} values={values} touched={touched} handleBlur={handleBlur} handleChange={handleChange}/>

                                    <button type="submit"
                                            className={"button is-primary mt-10 is-fullwidth " + (this.state.loading ? " is-loading" : "")}
                                            style={{paddingTop: 11}} disabled={isSubmitting}>
                                        Test
                                    </button>
                                </div>
                            )}

                        </form>
                    )}
                />
            </div>
        )
    }
}

export default FormTestComponent;
