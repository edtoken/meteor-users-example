import React, {Component, PropTypes} from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import Routes from '../app/routes';

const config = require('../app/config/app.conf.json');

document.title = config.client.pageTitle;

const loader = (percent, nodeBar, removeTime, nodeLoader) => {
	nodeBar.style.width = percent + '%';
	setTimeout(function () {
		nodeLoader.remove();
	}, removeTime)
};

Meteor.startup(() => {
	const nodeInitLoader = document.getElementById('init-loader');
	const nodeInitLoaderBar = document.getElementById('init-loader-bar');

	// todo need render app after client model load done
	setTimeout(function () {
		render(Routes(), document.getElementById('app-container'));
		loader(100, nodeInitLoaderBar, 500, nodeInitLoader);
	}, 1000);
});

