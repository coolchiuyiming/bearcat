/**
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat SingletonBeanFactory
 * Copyright(c) 2014 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var logger = require('pomelo-logger').getLogger('bearcar', 'SingletonBeanFactory');

/**
 * SingletonBeanFactory constructor function.
 *
 * @api public
 */
var SingletonBeanFactory = function() {
	this.singletonObjects = {};
}

module.exports = SingletonBeanFactory;

/**
 * SingletonBeanFactory add singleton to SingletonBeanFactory.
 *
 * @param  {String} beanName
 * @param {Object} beanObject
 * @api public
 */
SingletonBeanFactory.prototype.addSingleton = function(beanName, beanObject) {
	this.singletonObjects[beanName] = beanObject;
}

/**
 * SingletonBeanFactory check SingletonBeanFactory contains singleton or not.
 *
 * @param  {String} beanName
 * @return {Boolean}
 * @api public
 */
SingletonBeanFactory.prototype.containsSingleton = function(beanName) {
	return this.singletonObjects[beanName] !== null;
}

/**
 * SingletonBeanFactory get singleton from SingletonBeanFactory.
 *
 * @param  {String} beanName
 * @param  {Object} beanFactory
 * @return {Object} singletonObject
 * @api public
 */
SingletonBeanFactory.prototype.getSingleton = function(beanName, beanFactory) {
	arguments = Array.prototype.slice.apply(arguments);
	beanFactory = arguments.pop();

	var bean = this.singletonObjects[beanName];
	if (bean) {
		return bean;
	} else {
		bean = beanFactory.createBean.apply(beanFactory, arguments);
	}

	this.addSingleton(beanName, bean);

	return bean;
}

/**
 * SingletonBeanFactory get all singleton names from SingletonBeanFactory.
 *
 * @api public
 */
SingletonBeanFactory.prototype.getSingletonNames = function() {
	var r = [];
	for (var name in this.singletonObjects) {
		r.push(name);
	}

	return r;
}

/**
 * SingletonBeanFactory remove singleton from SingletonBeanFactory.
 *
 * @param  {String} beanName
 * @api public
 */
SingletonBeanFactory.prototype.removeSingleton = function(beanName) {
	delete this.singletonObjects[beanName];
}