'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Button = require('react-bootstrap/lib/Button');

var _Button2 = _interopRequireDefault(_Button);

var _FormControl = require('react-bootstrap/lib/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var _InputGroup = require('react-bootstrap/lib/InputGroup');

var _InputGroup2 = _interopRequireDefault(_InputGroup);

var _Overlay = require('react-bootstrap/lib/Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _Popover = require('react-bootstrap/lib/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _uuid = require('uuid');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // See http://jszen.blogspot.com/2007/03/how-to-build-simple-calendar-with.html for calendar logic.

var instanceCount = 0;

var CalendarHeader = function (_React$PureComponent) {
	_inherits(CalendarHeader, _React$PureComponent);

	function CalendarHeader(props) {
		_classCallCheck(this, CalendarHeader);

		var _this = _possibleConstructorReturn(this, (CalendarHeader.__proto__ || Object.getPrototypeOf(CalendarHeader)).call(this, props));

		_this.handleClickPrevious = _this.handleClickPrevious.bind(_this);
		_this.handleClickNext = _this.handleClickNext.bind(_this);
		_this.displayingMaxMonth = _this.displayingMaxMonth.bind(_this);
		return _this;
	}

	_createClass(CalendarHeader, [{
		key: 'displayingMinMonth',
		value: function displayingMinMonth() {
			if (!this.props.minDate) return false;

			var displayDate = new Date(this.props.displayDate);
			var minDate = new Date(this.props.minDate);
			return minDate.getFullYear() == displayDate.getFullYear() && minDate.getMonth() == displayDate.getMonth();
		}
	}, {
		key: 'displayingMaxMonth',
		value: function displayingMaxMonth() {
			if (!this.props.maxDate) return false;

			var displayDate = new Date(this.props.displayDate);
			var maxDate = new Date(this.props.maxDate);
			return maxDate.getFullYear() == displayDate.getFullYear() && maxDate.getMonth() == displayDate.getMonth();
		}
	}, {
		key: 'handleClickPrevious',
		value: function handleClickPrevious() {
			var newDisplayDate = new Date(this.props.displayDate);
			newDisplayDate.setDate(1);
			newDisplayDate.setMonth(newDisplayDate.getMonth() - 1);
			this.props.onChange(newDisplayDate);
		}
	}, {
		key: 'handleClickNext',
		value: function handleClickNext() {
			var newDisplayDate = new Date(this.props.displayDate);
			newDisplayDate.setDate(1);
			newDisplayDate.setMonth(newDisplayDate.getMonth() + 1);
			this.props.onChange(newDisplayDate);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'text-center' },
				_react2.default.createElement(
					'div',
					{ className: 'text-muted pull-left datepicker-previous-wrapper', onClick: this.handleClickPrevious, style: { cursor: 'pointer' } },
					this.displayingMinMonth() ? null : this.props.previousButtonElement
				),
				_react2.default.createElement(
					'span',
					null,
					this.props.monthLabels[this.props.displayDate.getMonth()],
					' ',
					this.props.displayDate.getFullYear()
				),
				_react2.default.createElement(
					'div',
					{ className: 'text-muted pull-right datepicker-next-wrapper', onClick: this.handleClickNext, style: { cursor: 'pointer' } },
					this.displayingMaxMonth() ? null : this.props.nextButtonElement
				)
			);
		}
	}]);

	return CalendarHeader;
}(_react2.default.PureComponent);

CalendarHeader.displayName = 'DatePickerHeader';

var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var Calendar = function (_React$PureComponent2) {
	_inherits(Calendar, _React$PureComponent2);

	function Calendar(props) {
		_classCallCheck(this, Calendar);

		var _this2 = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

		_this2.handleClick = _this2.handleClick.bind(_this2);
		_this2.handleClickToday = _this2.handleClickToday.bind(_this2);
		return _this2;
	}

	_createClass(Calendar, [{
		key: 'handleClick',
		value: function handleClick(day) {
			var newSelectedDate = this.setTimeToNoon(new Date(this.props.displayDate));
			newSelectedDate.setDate(day);
			this.props.onChange(newSelectedDate);
		}
	}, {
		key: 'handleClickToday',
		value: function handleClickToday() {
			var newSelectedDate = this.setTimeToNoon(new Date());
			this.props.onChange(newSelectedDate);
		}
	}, {
		key: 'setTimeToNoon',
		value: function setTimeToNoon(date) {
			date.setHours(12);
			date.setMinutes(0);
			date.setSeconds(0);
			date.setMilliseconds(0);
			return date;
		}
	}, {
		key: 'getWeekNumber',
		value: function getWeekNumber(date) {
			var target = new Date(date.valueOf());
			var dayNr = (date.getDay() + 6) % 7;
			target.setDate(target.getDate() - dayNr + 3);
			var firstThursday = target.valueOf();
			target.setMonth(0, 1);
			if (target.getDay() !== 4) {
				target.setMonth(0, 1 + (4 - target.getDay() + 7) % 7);
			}
			return 1 + Math.ceil((firstThursday - target) / 604800000);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var currentDate = this.setTimeToNoon(new Date());
			var selectedDate = this.props.selectedDate ? this.setTimeToNoon(new Date(this.props.selectedDate)) : null;
			var minDate = this.props.minDate ? this.setTimeToNoon(new Date(this.props.minDate)) : null;
			var maxDate = this.props.maxDate ? this.setTimeToNoon(new Date(this.props.maxDate)) : null;
			var year = this.props.displayDate.getFullYear();
			var month = this.props.displayDate.getMonth();
			var firstDay = new Date(year, month, 1);
			var startingDay = this.props.weekStartsOn > 1 ? firstDay.getDay() - this.props.weekStartsOn + 7 : this.props.weekStartsOn === 1 ? firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1 : firstDay.getDay();
			var showWeeks = this.props.showWeeks;

			var monthLength = daysInMonth[month];
			if (month == 1) {
				if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
					monthLength = 29;
				}
			}

			var weeks = [];
			var day = 1;
			for (var i = 0; i < 9; i++) {
				var week = [];
				for (var j = 0; j <= 6; j++) {
					var key = (0, _uuid.v4)();
					if (day <= monthLength && (i > 0 || j >= startingDay)) {
						var className = null;
						var date = new Date(year, month, day, 12, 0, 0, 0).toISOString();
						var beforeMinDate = minDate && Date.parse(date) < Date.parse(minDate);
						var afterMinDate = maxDate && Date.parse(date) > Date.parse(maxDate);
						if (beforeMinDate || afterMinDate) {
							week.push(_react2.default.createElement(
								'td',
								{
									key: (0, _uuid.v4)(),
									style: { padding: this.props.cellPadding },
									className: 'text-muted'
								},
								day
							));
						} else if (Date.parse(date) === Date.parse(selectedDate)) {
							className = 'bg-primary';
						} else if (Date.parse(date) === Date.parse(currentDate)) {
							className = 'text-primary';
						}
						week.push(_react2.default.createElement(
							'td',
							{
								key: key,
								onClick: this.handleClick.bind(this, day),
								style: { cursor: 'pointer', padding: this.props.cellPadding, borderRadius: this.props.roundedCorners ? 5 : 0 },
								className: className
							},
							day
						));
						day++;
					} else {
						week.push(_react2.default.createElement('td', { key: key }));
					}
				}

				if (showWeeks) {
					var weekNum = this.getWeekNumber(new Date(year, month, day - 1, 12, 0, 0, 0));
					week.unshift(_react2.default.createElement(
						'td',
						{
							key: (0, _uuid.v4)(),
							style: { padding: this.props.cellPadding, fontSize: '0.8em', color: 'darkgrey' },
							className: 'text-muted'
						},
						weekNum
					));
				}

				weeks.push(_react2.default.createElement(
					'tr',
					{ key: (0, _uuid.v4)() },
					week
				));
				if (day > monthLength) {
					break;
				}
			}

			var weekColumn = showWeeks ? _react2.default.createElement('td', {
				className: 'text-muted current-week',
				style: { padding: this.props.cellPadding } }) : null;

			return _react2.default.createElement(
				'table',
				{ className: 'text-center' },
				_react2.default.createElement(
					'thead',
					null,
					_react2.default.createElement(
						'tr',
						null,
						weekColumn,
						this.props.dayLabels.map(function (label, index) {
							return _react2.default.createElement(
								'td',
								{
									key: (0, _uuid.v4)(),
									className: 'text-muted',
									style: { padding: _this3.props.cellPadding } },
								_react2.default.createElement(
									'small',
									null,
									label
								)
							);
						})
					)
				),
				_react2.default.createElement(
					'tbody',
					null,
					weeks
				),
				this.props.showTodayButton && _react2.default.createElement(
					'tfoot',
					null,
					_react2.default.createElement(
						'tr',
						null,
						_react2.default.createElement(
							'td',
							{ colSpan: this.props.dayLabels.length, style: { paddingTop: '9px' } },
							_react2.default.createElement(
								_Button2.default,
								{
									block: true,
									bsSize: 'xsmall',
									className: 'u-today-button',
									onClick: this.handleClickToday },
								this.props.todayButtonLabel
							)
						)
					)
				)
			);
		}
	}]);

	return Calendar;
}(_react2.default.PureComponent);

Calendar.displayName = 'DatePickerCalendar';

var DatePicker = function (_React$PureComponent3) {
	_inherits(DatePicker, _React$PureComponent3);

	function DatePicker(props) {
		_classCallCheck(this, DatePicker);

		var _this4 = _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call(this, props));

		_this4.state = _this4.getInitialState();
		_this4.clear = _this4.clear.bind(_this4);
		_this4.handleHide = _this4.handleHide.bind(_this4);
		_this4.handleKeyDown = _this4.handleKeyDown.bind(_this4);
		_this4.handleFocus = _this4.handleFocus.bind(_this4);
		_this4.handleBlur = _this4.handleBlur.bind(_this4);
		_this4.handleBadInput = _this4.handleBadInput.bind(_this4);
		_this4.handleInputChange = _this4.handleInputChange.bind(_this4);
		_this4.onChangeMonth = _this4.onChangeMonth.bind(_this4);
		_this4.onChangeDate = _this4.onChangeDate.bind(_this4);
		return _this4;
	}

	_createClass(DatePicker, [{
		key: 'getInitialState',
		value: function getInitialState() {
			if (this.props.value && this.props.defaultValue) {
				throw new Error('Conflicting DatePicker properties \'value\' and \'defaultValue\'');
			}
			var state = this.makeDateValues(this.props.value || this.props.defaultValue);
			if (this.props.weekStartsOn > 1) {
				state.dayLabels = this.props.dayLabels.slice(this.props.weekStartsOn).concat(this.props.dayLabels.slice(0, this.props.weekStartsOn));
			} else if (this.props.weekStartsOn === 1) {
				state.dayLabels = this.props.dayLabels.slice(1).concat(this.props.dayLabels.slice(0, 1));
			} else {
				state.dayLabels = this.props.dayLabels;
			}
			state.focused = false;
			state.inputFocused = false;
			state.placeholder = this.props.placeholder || this.props.dateFormat;
			state.separator = this.props.dateFormat.match(/[^A-Z]/)[0];
			return state;
		}
	}, {
		key: 'makeDateValues',
		value: function makeDateValues(isoString) {
			var displayDate = void 0;
			var selectedDate = isoString ? new Date(isoString.slice(0, 10) + 'T12:00:00.000Z') : null;
			var minDate = this.props.minDate ? new Date(isoString.slice(0, 10) + 'T12:00:00.000Z') : null;
			var maxDate = this.props.maxDate ? new Date(isoString.slice(0, 10) + 'T12:00:00.000Z') : null;

			var inputValue = isoString ? this.makeInputValueString(selectedDate) : null;
			if (selectedDate) {
				displayDate = new Date(selectedDate);
			} else {
				var today = new Date(new Date().toISOString().slice(0, 10) + 'T12:00:00.000Z');
				if (minDate && Date.parse(minDate) >= Date.parse(today)) {
					displayDate = minDate;
				} else if (maxDate && Date.parse(maxDate) <= Date.parse(today)) {
					displayDate = maxDate;
				} else {
					displayDate = today;
				}
			}

			return {
				value: selectedDate ? selectedDate.toISOString() : null,
				displayDate: displayDate,
				selectedDate: selectedDate,
				inputValue: inputValue
			};
		}
	}, {
		key: 'clear',
		value: function clear() {
			if (this.props.onClear) {
				this.props.onClear();
			} else {
				this.setState(this.makeDateValues(null));
			}

			if (this.props.onChange) {
				this.props.onChange(null, null);
			}
		}
	}, {
		key: 'handleHide',
		value: function handleHide() {
			if (this.state.inputFocused) {
				return;
			}
			this.setState({
				focused: false
			});
			if (this.props.onBlur) {
				var event = document.createEvent('CustomEvent');
				event.initEvent('Change Date', true, false);
				_reactDom2.default.findDOMNode(this.refs.hiddenInput).dispatchEvent(event);
				this.props.onBlur(event);
			}
		}
	}, {
		key: 'handleKeyDown',
		value: function handleKeyDown(e) {
			if (e.which === 9 && this.state.inputFocused) {
				this.setState({
					focused: false
				});

				if (this.props.onBlur) {
					var event = document.createEvent('CustomEvent');
					event.initEvent('Change Date', true, false);
					_reactDom2.default.findDOMNode(this.refs.hiddenInput).dispatchEvent(event);
					this.props.onBlur(event);
				}
			}
		}
	}, {
		key: 'handleFocus',
		value: function handleFocus() {
			if (this.state.focused === true) {
				return;
			}

			var placement = this.getCalendarPlacement();

			this.setState({
				inputFocused: true,
				focused: true,
				calendarPlacement: placement
			});

			if (this.props.onFocus) {
				var event = document.createEvent('CustomEvent');
				event.initEvent('Change Date', true, false);
				_reactDom2.default.findDOMNode(this.refs.hiddenInput).dispatchEvent(event);
				this.props.onFocus(event);
			}
		}
	}, {
		key: 'handleBlur',
		value: function handleBlur() {
			this.setState({
				inputFocused: false
			});
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			return !(this.state.inputFocused === true && nextState.inputFocused === false);
		}
	}, {
		key: 'getValue',
		value: function getValue() {
			return this.state.selectedDate ? this.state.selectedDate.toISOString() : null;
		}
	}, {
		key: 'getFormattedValue',
		value: function getFormattedValue() {
			return this.state.displayDate ? this.state.inputValue : null;
		}
	}, {
		key: 'getCalendarPlacement',
		value: function getCalendarPlacement() {
			var tag = Object.prototype.toString.call(this.props.calendarPlacement);
			var isFunction = tag === '[object AsyncFunction]' || tag === '[object Function]' || tag === '[object GeneratorFunction]' || tag === '[object Proxy]';
			if (isFunction) {
				return this.props.calendarPlacement();
			} else {
				return this.props.calendarPlacement;
			}
		}
	}, {
		key: 'makeInputValueString',
		value: function makeInputValueString(date) {
			var month = date.getMonth() + 1;
			var day = date.getDate();

			//this method is executed during intialState setup... handle a missing state properly
			var separator = this.state ? this.state.separator : this.props.dateFormat.match(/[^A-Z]/)[0];
			if (this.props.dateFormat.match(/MM.DD.YYYY/)) {
				return (month > 9 ? month : '0' + month) + separator + (day > 9 ? day : '0' + day) + separator + date.getFullYear();
			} else if (this.props.dateFormat.match(/DD.MM.YYYY/)) {
				return (day > 9 ? day : '0' + day) + separator + (month > 9 ? month : '0' + month) + separator + date.getFullYear();
			} else {
				return date.getFullYear() + separator + (month > 9 ? month : '0' + month) + separator + (day > 9 ? day : '0' + day);
			}
		}
	}, {
		key: 'handleBadInput',
		value: function handleBadInput(originalValue) {
			var parts = originalValue.replace(new RegExp('[^0-9' + this.state.separator + ']'), '').split(this.state.separator);
			if (this.props.dateFormat.match(/MM.DD.YYYY/) || this.props.dateFormat.match(/DD.MM.YYYY/)) {
				if (parts[0] && parts[0].length > 2) {
					parts[1] = parts[0].slice(2) + (parts[1] || '');
					parts[0] = parts[0].slice(0, 2);
				}
				if (parts[1] && parts[1].length > 2) {
					parts[2] = parts[1].slice(2) + (parts[2] || '');
					parts[1] = parts[1].slice(0, 2);
				}
				if (parts[2]) {
					parts[2] = parts[2].slice(0, 4);
				}
			} else {
				if (parts[0] && parts[0].length > 4) {
					parts[1] = parts[0].slice(4) + (parts[1] || '');
					parts[0] = parts[0].slice(0, 4);
				}
				if (parts[1] && parts[1].length > 2) {
					parts[2] = parts[1].slice(2) + (parts[2] || '');
					parts[1] = parts[1].slice(0, 2);
				}
				if (parts[2]) {
					parts[2] = parts[2].slice(0, 2);
				}
			}
			this.setState({
				inputValue: parts.join(this.state.separator)
			});
		}
	}, {
		key: 'handleInputChange',
		value: function handleInputChange() {

			var originalValue = _reactDom2.default.findDOMNode(this.refs.input).value;
			var inputValue = originalValue.replace(/(-|\/\/)/g, this.state.separator).slice(0, 10);

			if (!inputValue) {
				this.clear();
				return;
			}

			var month = void 0,
			    day = void 0,
			    year = void 0;
			if (this.props.dateFormat.match(/MM.DD.YYYY/)) {
				if (!inputValue.match(/[0-1][0-9].[0-3][0-9].[1-2][0-9][0-9][0-9]/)) {
					return this.handleBadInput(originalValue);
				}

				month = inputValue.slice(0, 2).replace(/[^0-9]/g, '');
				day = inputValue.slice(3, 5).replace(/[^0-9]/g, '');
				year = inputValue.slice(6, 10).replace(/[^0-9]/g, '');
			} else if (this.props.dateFormat.match(/DD.MM.YYYY/)) {
				if (!inputValue.match(/[0-3][0-9].[0-1][0-9].[1-2][0-9][0-9][0-9]/)) {
					return this.handleBadInput(originalValue);
				}

				day = inputValue.slice(0, 2).replace(/[^0-9]/g, '');
				month = inputValue.slice(3, 5).replace(/[^0-9]/g, '');
				year = inputValue.slice(6, 10).replace(/[^0-9]/g, '');
			} else {
				if (!inputValue.match(/[1-2][0-9][0-9][0-9].[0-1][0-9].[0-3][0-9]/)) {
					return this.handleBadInput(originalValue);
				}

				year = inputValue.slice(0, 4).replace(/[^0-9]/g, '');
				month = inputValue.slice(5, 7).replace(/[^0-9]/g, '');
				day = inputValue.slice(8, 10).replace(/[^0-9]/g, '');
			}

			var monthInteger = parseInt(month, 10);
			var dayInteger = parseInt(day, 10);
			var yearInteger = parseInt(year, 10);
			if (monthInteger > 12 || dayInteger > 31) {
				return this.handleBadInput(originalValue);
			}

			if (!isNaN(monthInteger) && !isNaN(dayInteger) && !isNaN(yearInteger) && monthInteger <= 12 && dayInteger <= 31 && yearInteger > 999) {
				var selectedDate = new Date(yearInteger, monthInteger - 1, dayInteger, 12, 0, 0, 0);
				this.setState({
					selectedDate: selectedDate,
					displayDate: selectedDate,
					value: selectedDate.toISOString()
				});

				if (this.props.onChange) {
					this.props.onChange(selectedDate.toISOString(), inputValue);
				}
			}

			this.setState({
				inputValue: inputValue
			});
		}
	}, {
		key: 'onChangeMonth',
		value: function onChangeMonth(newDisplayDate) {
			this.setState({
				displayDate: newDisplayDate
			});
		}
	}, {
		key: 'onChangeDate',
		value: function onChangeDate(newSelectedDate) {
			var inputValue = this.makeInputValueString(newSelectedDate);
			this.setState({
				inputValue: inputValue,
				selectedDate: newSelectedDate,
				displayDate: newSelectedDate,
				value: newSelectedDate.toISOString(),
				focused: false
			});

			if (this.props.onBlur) {
				var event = document.createEvent('CustomEvent');
				event.initEvent('Change Date', true, false);
				_reactDom2.default.findDOMNode(this.refs.hiddenInput).dispatchEvent(event);
				this.props.onBlur(event);
			}

			if (this.props.onChange) {
				this.props.onChange(newSelectedDate.toISOString(), inputValue);
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(newProps) {
			var value = newProps.value;
			if (this.getValue() !== value) {
				this.setState(this.makeDateValues(value));
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this5 = this;

			var calendarHeader = _react2.default.createElement(CalendarHeader, {
				previousButtonElement: this.props.previousButtonElement,
				nextButtonElement: this.props.nextButtonElement,
				displayDate: this.state.displayDate,
				minDate: this.props.minDate,
				maxDate: this.props.maxDate,
				onChange: this.onChangeMonth,
				monthLabels: this.props.monthLabels,
				dateFormat: this.props.dateFormat });

			var control = this.props.customControl ? _react2.default.cloneElement(this.props.customControl, {
				onKeyDown: this.handleKeyDown,
				value: this.state.inputValue || '',
				required: this.props.required,
				placeholder: this.state.focused ? this.props.dateFormat : this.state.placeholder,
				ref: 'input',
				disabled: this.props.disabled,
				onFocus: this.handleFocus,
				onBlur: this.handleBlur,
				onChange: this.handleInputChange,
				className: this.props.className,
				style: this.props.style,
				autoComplete: this.props.autoComplete,
				onInvalid: this.props.onInvalid,
				noValidate: this.props.noValidate
			}) : _react2.default.createElement(_FormControl2.default, {
				onKeyDown: this.handleKeyDown,
				value: this.state.inputValue || '',
				required: this.props.required,
				ref: 'input',
				type: 'text',
				className: this.props.className,
				style: this.props.style,
				autoFocus: this.props.autoFocus,
				disabled: this.props.disabled,
				placeholder: this.state.focused ? this.props.dateFormat : this.state.placeholder,
				onFocus: this.handleFocus,
				onBlur: this.handleBlur,
				onChange: this.handleInputChange,
				autoComplete: this.props.autoComplete,
				onInvalid: this.props.onInvalid,
				noValidate: this.props.noValidate
			});

			return _react2.default.createElement(
				_InputGroup2.default,
				{
					ref: 'inputGroup',
					bsClass: this.props.showClearButton ? this.props.bsClass : '',
					bsSize: this.props.bsSize,
					id: this.props.id ? this.props.id + '_group' : null },
				control,
				_react2.default.createElement(
					_Overlay2.default,
					{
						rootClose: true,
						onHide: this.handleHide,
						show: this.state.focused,
						container: function container() {
							return _this5.props.calendarContainer || _reactDom2.default.findDOMNode(_this5.refs.overlayContainer);
						},
						target: function target() {
							return _reactDom2.default.findDOMNode(_this5.refs.input);
						},
						placement: this.state.calendarPlacement,
						delayHide: 200 },
					_react2.default.createElement(
						_Popover2.default,
						{ id: 'date-picker-popover-' + this.props.instanceCount, className: 'date-picker-popover', title: calendarHeader },
						_react2.default.createElement(Calendar, {
							cellPadding: this.props.cellPadding,
							selectedDate: this.state.selectedDate,
							displayDate: this.state.displayDate,
							onChange: this.onChangeDate,
							dayLabels: this.state.dayLabels,
							weekStartsOn: this.props.weekStartsOn,
							showTodayButton: this.props.showTodayButton,
							todayButtonLabel: this.props.todayButtonLabel,
							minDate: this.props.minDate,
							maxDate: this.props.maxDate,
							roundedCorners: this.props.roundedCorners,
							showWeeks: this.props.showWeeks
						})
					)
				),
				_react2.default.createElement('div', { ref: 'overlayContainer', style: { position: 'relative' } }),
				_react2.default.createElement('input', { ref: 'hiddenInput', type: 'hidden', id: this.props.id, name: this.props.name, value: this.state.value || '', 'data-formattedvalue': this.state.value ? this.state.inputValue : '' }),
				this.props.showClearButton && !this.props.customControl && _react2.default.createElement(
					_InputGroup2.default.Addon,
					{
						onClick: this.props.disabled ? null : this.clear,
						style: { cursor: this.state.inputValue && !this.props.disabled ? 'pointer' : 'not-allowed' } },
					_react2.default.createElement(
						'div',
						{ style: { opacity: this.state.inputValue && !this.props.disabled ? 1 : 0.5 } },
						this.props.clearButtonElement
					)
				),
				this.props.children
			);
		}
	}]);

	return DatePicker;
}(_react2.default.PureComponent);

exports.default = DatePicker;


var getDefaultProps = function getDefaultProps() {
	var language = typeof window !== 'undefined' && window.navigator ? (window.navigator.userLanguage || window.navigator.language || '').toLowerCase() : '';
	var dateFormat = !language || language === 'en-us' ? 'MM/DD/YYYY' : 'DD/MM/YYYY';
	return {
		cellPadding: '5px',
		dayLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		monthLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		clearButtonElement: '×',
		previousButtonElement: '<',
		nextButtonElement: '>',
		calendarPlacement: 'bottom',
		dateFormat: dateFormat,
		showClearButton: true,
		autoFocus: false,
		disabled: false,
		showTodayButton: false,
		todayButtonLabel: 'Today',
		autoComplete: 'on',
		showWeeks: false,
		instanceCount: instanceCount++,
		style: {
			width: '100%'
		},
		roundedCorners: false,
		noValidate: false
	};
};

DatePicker.defaultProps = getDefaultProps();
module.exports = exports['default'];