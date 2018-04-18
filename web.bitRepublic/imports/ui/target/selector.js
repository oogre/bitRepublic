/*----------------------------------------*\
  larbitsSisters - selector.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-04-10 10:51:24
  @Last Modified time: 2018-04-18 16:23:40
\*----------------------------------------*/

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import isMobile from 'ismobilejs';
import { config } from '../../startup/config.js';

import { Targets } from '../../api/targets/targets.js';

import MessageError from '../message/error.js';
import FixeWait from '../fixe/wait.js';

class TargetSelector extends Component {
	constructor(props){
		super(props);
		this.state = {
			'error-target' : false,
			selectedOption : '',
			success : false,
			message : ""
		};
	}
	handleChangeText(event){
		this.handleChangeTarget({
			value : event.target.value,
			label : event.target.value
		});
	}
	handleChangeTarget(selectedOption){
		this.setState({ selectedOption : selectedOption });
		this.props.onTargetSelected(selectedOption);
	}
	render() {
		const { selectedOption } = this.state;
  		const value = selectedOption && selectedOption.value;
  		return (
  			<div>
  			{
				this.props.targets.length > 0 ? 
  					<div>
						<Select
							placeholder={"Choose your " + (this.props.process == "politics" ? "leader" : "ceo") }
							inputProps={{autoComplete: 'off'}}
							name="target"
							value={value}
							searchable = {!(new isMobile.Class()).any}
							options={this.props.targets}
							onChange={this.handleChangeTarget.bind(this)}
							autoComplete="false"
						/>
						{ 	this.props.error ?
								<MessageError
									error={this.props.error}
									messages={config.FORM.ERRORS.target}
								/>
							:
								null
						}
					</div>
				:
					<div>
						<input
							type="text"
							ref="friendList"
							name="friendList"
							placeholder="Entre twitter username (@larbitslab, @ogre_vince) "
							onChange={this.handleChangeText.bind(this)}
						/>
						{ 	this.state["error-friends"] ?
								<MessageError
									error={this.state["error-friends"]}
									messages={config.FORM.ERRORS.friends}
								/>
							:
								null
						}
					</div>
  			}
  			</div>
		);
	}
}
export default withTracker(self => {
	let targetsReady = FlowRouter.subsReady("targets");
	let isReady = targetsReady;
	let targets = [];
	if(isReady){
		targets = Targets.find({
			type : self.process == "politics" ? "state" : (self.process == "ceos" ? "company" : "")
		}, {
			fields : {
				from : 1,
				name : 1,
				role : 1
			},
			sort : {
				from : 1
			}
		})
		.fetch()
		.map( target => {
			return {
				value : target._id,
				label : target.name.trim() + ", " + target.role.trim() +  " of " + target.from.trim()
			}
		});
	}

	return {
		targets : targets,
		isReady : isReady
	};
})(TargetSelector);