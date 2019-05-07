import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {userDetails} from '../Users/redux/memoized-selectors'
import {Redirect} from 'react-router'
import auth from '../../../client/auth/auth-helper'
import {withStyles} from 'material-ui/Styles'
import {compose} from 'redux'
import Card, {CardActions, CardContent} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import {updateSingleUser} from './redux/actions'

const styles = theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit * 2
    },
    title: {
        margin: theme.spacing.unit * 2,
        color: theme.palette.protectedTitle
    },
    error: {
        verticalAlign: 'middle'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing.unit * 2
    }
})

export class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            error: '',
            redirectToProfile: false
        }
        // this.match = match
    }

    static propTypes = {
        loginId: PropTypes.string
    }

    clickSubmit = () => {
        const jwt = auth.isAuthenticated()
        const user = this.props.user && this.props.user.toJS()
        console.log({userId: this.match.params.userId},
            {t: jwt.token},
            user,
            '<---- check this item'
        )
        // this.props.updateSingleUser(
        //     {userId: this.match.params.userId},
        //     {t: jwt.token},
        //     user
        // )
        // update({
        //     userId: this.match.params.userId
        // }, {
        //     t: jwt.token
        // }, user).then((data) => {
        //     if (data.error) {
        //         this.setState({error: data.error})
        //     } else {
        //         this.setState({'userId': data._id, 'redirectToProfile': true})
        //     }
        // })
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value})
    }

    render() {
        const {classes} = this.props
        if (this.state.redirectToProfile) {
            return (<Redirect to={'/user/' + this.state.userId}/>)
        }
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography type="headline" component="h2" className={classes.title}>
                        Edit Profile
                    </Typography>
                    <TextField id="name" label="Name" className={classes.textField} value={this.state.name} onChange={this.handleChange('name')} margin="normal"/><br/>
                    <TextField id="email" type="email" label="Email" className={classes.textField} value={this.state.email} onChange={this.handleChange('email')} margin="normal"/><br/>
                    <TextField id="password" type="password" label="Password" className={classes.textField} value={this.state.password} onChange={this.handleChange('password')} margin="normal"/>
                    <br/> {
                    this.state.error && (<Typography component="p" color="error">
                        <Icon color="error" className={classes.error}>error</Icon>
                        {this.state.error}
                    </Typography>)
                }
                </CardContent>
                <CardActions>
                    <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>Submit</Button>
                </CardActions>
            </Card>
        )

    }
}
export default compose(
    withStyles(styles, {name: 'EditProfile'}),
    connect(userDetails, {updateSingleUser})
)(EditProfile)