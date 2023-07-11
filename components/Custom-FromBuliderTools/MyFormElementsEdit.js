// import React from 'react';
// import { FormElementsEdit } from 'react-form-builder2';

// const MyFormElementsEdit = (props) => {
//   const {
//     editElement,
//     updateElement,
//     Element,
//     data,
//     ...rest
//   } = props;

//   const handleChange = (event) => {
//     const newData = { ...data };
//     newData[event.target.name] = event.target.value;
//     updateElement(newData);
//   };

//   if (editElement && editElement.key === 'MyConditionalInput') {
//     return (
//       <div>
//         <div className="form-group">
//           <label>Label for Input</label>
//           <input
//             type="text"
//             className="form-control"
//             name="inputLabel"
//             value={data.inputLabel}
//             onChange={handleChange}
//           />
//         </div>
//         {/* add more form fields here as needed */}
//       </div>
//     );
//   } else {
//     return <FormElementsEdit {...props} />;
//   }
// };
// export default MyFormElementsEdit;



// import React from 'react';
// import TextAreaAutosize from 'react-form-builder2/node_modules/react-textarea-autosize';
// // import TextAreaAutosize from '../../node_modules/';

// // import {
// //   ContentState, EditorState, convertFromHTML, convertToRaw,
// // } from 'react-form-builder2/node_modules/draft-js';
// import {
//   ContentState, EditorState, convertFromHTML, convertToRaw,
// } from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
// // import { Editor } from '@react-form-builder2/node_modules/react-draft-wysiwyg';
// import { Editor } from 'react-draft-wysiwyg';


// // import DynamicOptionList from './dynamic-option-list'; dynamic-option-list

// import DynamicOptionList from 'node_modules/react-form-builder2/lib/dynamic-option-list';
// // import { get } from './stores/requests';
// import { get } from 'node_modules/react-form-builder2/lib/stores/requests';

// // import ID from './UUID';
// import ID from 'node_modules/react-form-builder2/lib/UUID';

// // import IntlMessages from './language-provider/IntlMessages';
// import IntlMessages from 'node_modules/react-form-builder2/lib/language-provider/IntlMessages.js';


// const toolbar = {
//   options: ['inline', 'list', 'textAlign', 'fontSize', 'link', 'history'],
//   inline: {
//     inDropdown: false,
//     className: undefined,
//     options: ['bold', 'italic', 'underline', 'superscript', 'subscript'],
//   },
// };

// export default class FormElementsEdit extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       element: this.props.element,
//       data: this.props.data,
//       dirty: false,
//     };
//   }

//   toggleRequired() {
//     // const this_element = this.state.element;
//   }

//   editElementProp(elemProperty, targProperty, e) {
//     // elemProperty could be content or label
//     // targProperty could be value or checked
//     const this_element = this.state.element;
//     this_element[elemProperty] = e.target[targProperty];

//     this.setState({
//       element: this_element,
//       dirty: true,
//     }, () => {
//       if (targProperty === 'checked') { this.updateElement(); }
//     });
//   }

//   onEditorStateChange(index, property, editorContent) {
//     // const html = draftToHtml(convertToRaw(editorContent.getCurrentContent())).replace(/<p>/g, '<div>').replace(/<\/p>/g, '</div>');
//     const html = draftToHtml(convertToRaw(editorContent.getCurrentContent())).replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/&nbsp;/g, ' ')
//       .replace(/(?:\r\n|\r|\n)/g, ' ');
//     const this_element = this.state.element;
//     this_element[property] = html;

//     this.setState({
//       element: this_element,
//       dirty: true,
//     });
//   }

//   updateElement() {
//     const this_element = this.state.element;
//     // to prevent ajax calls with no change
//     if (this.state.dirty) {
//       this.props.updateElement.call(this.props.preview, this_element);
//       this.setState({ dirty: false });
//     }
//   }

//   convertFromHTML(content) {
//     const newContent = convertFromHTML(content);
//     if (!newContent.contentBlocks || !newContent.contentBlocks.length) {
//       // to prevent crash when no contents in editor
//       return EditorState.createEmpty();
//     }
//     const contentState = ContentState.createFromBlockArray(newContent);
//     return EditorState.createWithContent(contentState);
//   }

//   addOptions() {
//     const optionsApiUrl = document.getElementById('optionsApiUrl').value;
//     if (optionsApiUrl) {
//       get(optionsApiUrl).then(data => {
//         this.props.element.options = [];
//         const { options } = this.props.element;
//         data.forEach(x => {
//           // eslint-disable-next-line no-param-reassign
//           x.key = ID.uuid();
//           options.push(x);
//         });
//         const this_element = this.state.element;
//         this.setState({
//           element: this_element,
//           dirty: true,
//         });
//       });
//     }
//   }

//   render() {
//     if (this.state.dirty) {
//       this.props.element.dirty = true;
//     }

//     const this_checked = this.props.element.hasOwnProperty('required') ? this.props.element.required : false;
//     const this_read_only = this.props.element.hasOwnProperty('readOnly') ? this.props.element.readOnly : false;
//     const this_default_today = this.props.element.hasOwnProperty('defaultToday') ? this.props.element.defaultToday : false;
//     const this_show_time_select = this.props.element.hasOwnProperty('showTimeSelect') ? this.props.element.showTimeSelect : false;
//     const this_show_time_select_only = this.props.element.hasOwnProperty('showTimeSelectOnly') ? this.props.element.showTimeSelectOnly : false;
//     const this_show_time_input = this.props.element.hasOwnProperty('showTimeInput') ? this.props.element.showTimeInput : false;
//     const this_checked_inline = this.props.element.hasOwnProperty('inline') ? this.props.element.inline : false;
//     const this_checked_bold = this.props.element.hasOwnProperty('bold') ? this.props.element.bold : false;
//     const this_checked_italic = this.props.element.hasOwnProperty('italic') ? this.props.element.italic : false;
//     const this_checked_center = this.props.element.hasOwnProperty('center') ? this.props.element.center : false;
//     const this_checked_page_break = this.props.element.hasOwnProperty('pageBreakBefore') ? this.props.element.pageBreakBefore : false;
//     const this_checked_alternate_form = this.props.element.hasOwnProperty('alternateForm') ? this.props.element.alternateForm : false;

//     const {
//       canHavePageBreakBefore, canHaveAlternateForm, canHaveDisplayHorizontal, canHaveOptionCorrect, canHaveOptionValue,
//     } = this.props.element;
//     const canHaveImageSize = (this.state.element.element === 'Image' || this.state.element.element === 'Camera');

//     const this_files = this.props.files.length ? this.props.files : [];
//     if (this_files.length < 1 || (this_files.length > 0 && this_files[0].id !== '')) {
//       this_files.unshift({ id: '', file_name: '' });
//     }

//     let editorState;
//     if (this.props.element.hasOwnProperty('content')) {
//       editorState = this.convertFromHTML(this.props.element.content);
//     }
//     if (this.props.element.hasOwnProperty('label')) {
//       editorState = this.convertFromHTML(this.props.element.label);
//     }

//     return (
//       <div>
//         <div className="clearfix">
//           <h4 className="float-left">{this.props.element.text}</h4>
//           <i className="float-right fas fa-times dismiss-edit" onClick={this.props.manualEditModeOff}></i>
//         </div>
//         { this.props.element.hasOwnProperty('content') &&
//           <div className="form-group">
//             <label className="control-label"><IntlMessages id="text-to-display" />:</label>

//             {/* <Editor
//               toolbar={toolbar}
//               defaultEditorState={editorState}
//               onBlur={this.updateElement.bind(this)}
//               onEditorStateChange={this.onEditorStateChange.bind(this, 0, 'content')}
//               stripPastedStyles={true} /> */}
//           </div>
//         }
//         { this.props.element.hasOwnProperty('file_path') &&
//           <div className="form-group">
//             <label className="control-label" htmlFor="fileSelect"><IntlMessages id="choose-file" />:</label>
//             <select id="fileSelect" className="form-control" defaultValue={this.props.element.file_path} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'file_path', 'value')}>
//               {this_files.map((file) => {
//                 const this_key = `file_${file.id}`;
//                 return <option value={file.id} key={this_key}>{file.file_name}</option>;
//               })}
//             </select>
//           </div>
//         }
//         { this.props.element.hasOwnProperty('href') &&
//           <div className="form-group">
//             <TextAreaAutosize type="text" className="form-control" defaultValue={this.props.element.href} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'href', 'value')} />
//           </div>
//         }
//         { this.props.element.hasOwnProperty('label') &&
//           <div className="form-group">
//             <label><IntlMessages id="display-label" /></label>
//             {/* <Editor
//               toolbar={toolbar}
//               defaultEditorState={editorState}
//               onBlur={this.updateElement.bind(this)}
//               onEditorStateChange={this.onEditorStateChange.bind(this, 0, 'label')}
//               stripPastedStyles={true} /> */}
//             <br />
//             <div className="custom-control custom-checkbox">
//               <input id="is-required" className="custom-control-input" type="checkbox" checked={this_checked} value={true} onChange={this.editElementProp.bind(this, 'required', 'checked')} />
//               <label className="custom-control-label" htmlFor="is-required">
//               <IntlMessages id="required" />
//               </label>
//             </div>
//             { this.props.element.hasOwnProperty('readOnly') &&
//               <div className="custom-control custom-checkbox">
//                 <input id="is-read-only" className="custom-control-input" type="checkbox" checked={this_read_only} value={true} onChange={this.editElementProp.bind(this, 'readOnly', 'checked')} />
//                 <label className="custom-control-label" htmlFor="is-read-only">
//                 <IntlMessages id="read-only" />
//                 </label>
//               </div>
//             }
//             { this.props.element.hasOwnProperty('defaultToday') &&
//               <div className="custom-control custom-checkbox">
//                 <input id="is-default-to-today" className="custom-control-input" type="checkbox" checked={this_default_today} value={true} onChange={this.editElementProp.bind(this, 'defaultToday', 'checked')} />
//                 <label className="custom-control-label" htmlFor="is-default-to-today">
//                 <IntlMessages id="default-to-today" />?
//                 </label>
//               </div>
//             }
//             { this.props.element.hasOwnProperty('showTimeSelect') &&
//               <div className="custom-control custom-checkbox">
//                 <input id="show-time-select" className="custom-control-input" type="checkbox" checked={this_show_time_select} value={true} onChange={this.editElementProp.bind(this, 'showTimeSelect', 'checked')} />
//                 <label className="custom-control-label" htmlFor="show-time-select">
//                 <IntlMessages id="show-time-select" />?
//                 </label>
//               </div>
//             }
//             { this_show_time_select && this.props.element.hasOwnProperty('showTimeSelectOnly') &&
//               <div className="custom-control custom-checkbox">
//                 <input id="show-time-select-only" className="custom-control-input" type="checkbox" checked={this_show_time_select_only} value={true} onChange={this.editElementProp.bind(this, 'showTimeSelectOnly', 'checked')} />
//                 <label className="custom-control-label" htmlFor="show-time-select-only">
//                 <IntlMessages id="show-time-select-only" />?
//                 </label>
//               </div>
//             }
//             { this.props.element.hasOwnProperty('showTimeInput') &&
//               <div className="custom-control custom-checkbox">
//                 <input id="show-time-input" className="custom-control-input" type="checkbox" checked={this_show_time_input} value={true} onChange={this.editElementProp.bind(this, 'showTimeInput', 'checked')} />
//                 <label className="custom-control-label" htmlFor="show-time-input">
//                 <IntlMessages id="show-time-input" />?
//                 </label>
//               </div>
//             }
//             { (this.state.element.element === 'RadioButtons' || this.state.element.element === 'Checkboxes') && canHaveDisplayHorizontal &&
//               <div className="custom-control custom-checkbox">
//                 <input id="display-horizontal" className="custom-control-input" type="checkbox" checked={this_checked_inline} value={true} onChange={this.editElementProp.bind(this, 'inline', 'checked')} />
//                 <label className="custom-control-label" htmlFor="display-horizontal">
//                 <IntlMessages id="display-horizontal" />
//                 </label>
//               </div>
//             }
//           </div>
//         }
//         { this.props.element.hasOwnProperty('src') &&
//           <div>
//             <div className="form-group">
//               <label className="control-label" htmlFor="srcInput"><IntlMessages id="link-to" />:</label>
//               <input id="srcInput" type="text" className="form-control" defaultValue={this.props.element.src} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'src', 'value')} />
//             </div>
//           </div>
//         }
//         { canHaveImageSize &&
//           <div>
//             <div className="form-group">
//               <div className="custom-control custom-checkbox">
//                 <input id="do-center" className="custom-control-input" type="checkbox" checked={this_checked_center} value={true} onChange={this.editElementProp.bind(this, 'center', 'checked')} />
//                 <label className="custom-control-label" htmlFor="do-center">
//                 <IntlMessages id="center" />?
//                 </label>
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-sm-3">
//                 <label className="control-label" htmlFor="elementWidth"><IntlMessages id="width" />:</label>
//                 <input id="elementWidth" type="text" className="form-control" defaultValue={this.props.element.width} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'width', 'value')} />
//               </div>
//               <div className="col-sm-3">
//                 <label className="control-label" htmlFor="elementHeight"><IntlMessages id="height" />:</label>
//                 <input id="elementHeight" type="text" className="form-control" defaultValue={this.props.element.height} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'height', 'value')} />
//               </div>
//             </div>
//           </div>
//         }
//         {this.state.element.element === 'FileUpload' && (
//           <div>
//             <div className='form-group'>
//               <label className='control-label' htmlFor='fileType'>
//                 <IntlMessages id='choose-file-type' />:
//               </label>
//               <select
//                 id='fileType'
//                 className="form-control"
//                 onBlur={this.updateElement.bind(this)}
//                 onChange={this.editElementProp.bind(this, 'fileType', 'value')}
//               >
//                 {[
//                   {
//                     type: 'image, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, video/mp4,video/x-m4v,video/*',
//                     typeName: 'All File Type',
//                   },
//                   { type: 'image', typeName: 'Image' },
//                   { type: 'application/pdf', typeName: 'PDF' },
//                   {
//                     type: 'application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//                     typeName: 'Word',
//                   },
//                   {
//                     type: 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//                     typeName: 'Excel',
//                   },
//                   {
//                     type: 'application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation',
//                     typeName: 'Powerpoint',
//                   },
//                   {
//                     type: 'video/mp4,video/x-m4v,video/*',
//                     typeName: 'Videos',
//                   },
//                 ].map((file, index) => (
//                   <option value={file.type} key={index}>
//                     {file.typeName}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         )}
//         {this.state.element.element === 'Signature' && this.props.element.readOnly
//           ? (
//             <div className="form-group">
//               <label className="control-label" htmlFor="variableKey"><IntlMessages id="variable-key" />:</label>
//               <input id="variableKey" type="text" className="form-control" defaultValue={this.props.element.variableKey} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'variableKey', 'value')} />
//               <p className="help-block"><IntlMessages id="variable-key-desc" />.</p>
//             </div>
//           )
//           : (<div/>)
//         }

//         {canHavePageBreakBefore &&
//           <div className="form-group">
//             <label className="control-label"><IntlMessages id="print-options" /></label>
//             <div className="custom-control custom-checkbox">
//               <input id="page-break-before-element" className="custom-control-input" type="checkbox" checked={this_checked_page_break} value={true} onChange={this.editElementProp.bind(this, 'pageBreakBefore', 'checked')} />
//               <label className="custom-control-label" htmlFor="page-break-before-element">
//               <IntlMessages id="page-break-before-elements" />?
//               </label>
//             </div>
//           </div>
//         }

//         {canHaveAlternateForm &&
//           <div className="form-group">
//             <label className="control-label"><IntlMessages id="alternate-signature-page" /></label>
//             <div className="custom-control custom-checkbox">
//               <input id="display-on-alternate" className="custom-control-input" type="checkbox" checked={this_checked_alternate_form} value={true} onChange={this.editElementProp.bind(this, 'alternateForm', 'checked')} />
//               <label className="custom-control-label" htmlFor="display-on-alternate">
//               <IntlMessages id="display-on-alternate-signature-page" />?
//               </label>
//             </div>
//           </div>
//         }
//         { this.props.element.hasOwnProperty('step') &&
//           <div className="form-group">
//             <div className="form-group-range">
//               <label className="control-label" htmlFor="rangeStep"><IntlMessages id="step" /></label>
//               <input id="rangeStep" type="number" className="form-control" defaultValue={this.props.element.step} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'step', 'value')} />
//             </div>
//           </div>
//         }
//         { this.props.element.hasOwnProperty('min_value') &&
//           <div className="form-group">
//             <div className="form-group-range">
//               <label className="control-label" htmlFor="rangeMin"><IntlMessages id="min" /></label>
//               <input id="rangeMin" type="number" className="form-control" defaultValue={this.props.element.min_value} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'min_value', 'value')} />
//               <input type="text" className="form-control" defaultValue={this.props.element.min_label} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'min_label', 'value')} />
//             </div>
//           </div>
//         }
//         { this.props.element.hasOwnProperty('max_value') &&
//           <div className="form-group">
//             <div className="form-group-range">
//               <label className="control-label" htmlFor="rangeMax"><IntlMessages id="max" /></label>
//               <input id="rangeMax" type="number" className="form-control" defaultValue={this.props.element.max_value} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'max_value', 'value')} />
//               <input type="text" className="form-control" defaultValue={this.props.element.max_label} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'max_label', 'value')} />
//             </div>
//           </div>
//         }
//         { this.props.element.hasOwnProperty('default_value') &&
//           <div className="form-group">
//             <div className="form-group-range">
//               <label className="control-label" htmlFor="defaultSelected"><IntlMessages id="default-selected" /></label>
//               <input id="defaultSelected" type="number" className="form-control" defaultValue={this.props.element.default_value} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'default_value', 'value')} />
//             </div>
//           </div>
//         }
//         { this.props.element.hasOwnProperty('static') && this.props.element.static &&
//           <div className="form-group">
//             <label className="control-label"><IntlMessages id="text-style" /></label>
//             <div className="custom-control custom-checkbox">
//               <input id="do-bold" className="custom-control-input" type="checkbox" checked={this_checked_bold} value={true} onChange={this.editElementProp.bind(this, 'bold', 'checked')} />
//               <label className="custom-control-label" htmlFor="do-bold">
//               <IntlMessages id="bold" />
//               </label>
//             </div>
//             <div className="custom-control custom-checkbox">
//               <input id="do-italic" className="custom-control-input" type="checkbox" checked={this_checked_italic} value={true} onChange={this.editElementProp.bind(this, 'italic', 'checked')} />
//               <label className="custom-control-label" htmlFor="do-italic">
//               <IntlMessages id="italic" />
//               </label>
//             </div>
//           </div>
//         }
//         { this.props.element.showDescription &&
//           <div className="form-group">
//             <label className="control-label" htmlFor="questionDescription"><IntlMessages id="description" /></label>
//             <TextAreaAutosize type="text" className="form-control" id="questionDescription" defaultValue={this.props.element.description} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'description', 'value')} />
//           </div>
//         }
//         { this.props.showCorrectColumn && this.props.element.canHaveAnswer && !this.props.element.hasOwnProperty('options') &&
//           <div className="form-group">
//             <label className="control-label" htmlFor="correctAnswer"><IntlMessages id="correct-answer" /></label>
//             <input id="correctAnswer" type="text" className="form-control" defaultValue={this.props.element.correct} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'correct', 'value')} />
//           </div>
//         }
//         { this.props.element.canPopulateFromApi && this.props.element.hasOwnProperty('options') &&
//           <div className="form-group">
//             <label className="control-label" htmlFor="optionsApiUrl"><IntlMessages id="populate-options-from-api" /></label>
//             <div className="row">
//               <div className="col-sm-6">
//                 <input className="form-control" style={{ width: '100%' }} type="text" id="optionsApiUrl" placeholder="http://localhost:8080/api/optionsdata" />
//               </div>
//               <div className="col-sm-6">
//                 <button onClick={this.addOptions.bind(this)} className="btn btn-success"><IntlMessages id="populate" /></button>
//               </div>
//             </div>
//           </div>
//         }
//         { this.props.element.hasOwnProperty('options') &&
//           <DynamicOptionList showCorrectColumn={this.props.showCorrectColumn}
//             canHaveOptionCorrect={canHaveOptionCorrect}
//             canHaveOptionValue={canHaveOptionValue}
//             data={this.props.preview.state.data}
//             updateElement={this.props.updateElement}
//             preview={this.props.preview}
//             element={this.props.element}
//             key={this.props.element.options.length} />
//         }
//       </div>
//     );
//   }
// }
// FormElementsEdit.defaultProps = { className: 'edit-element-fields' };





// import React from 'react';
// import TextAreaAutosize from 'react-textarea-autosize';
// import {
//   ContentState, EditorState, convertFromHTML, convertToRaw,
// } from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
// import { Editor } from 'react-draft-wysiwyg';

// import DynamicOptionList from './dynamic-option-list';
// import { get } from './stores/requests';
// import ID from './UUID';
// import IntlMessages from './language-provider/IntlMessages';


import React from 'react';
import dynamic from 'next/dynamic';

import TextAreaAutosize from 'react-form-builder2/node_modules/react-textarea-autosize';
import {
  ContentState, EditorState, convertFromHTML, convertToRaw,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
)
import DynamicOptionList from 'node_modules/react-form-builder2/lib/dynamic-option-list';
import { get } from 'node_modules/react-form-builder2/lib/stores/requests';
import ID from 'node_modules/react-form-builder2/lib/UUID';
import IntlMessages from 'node_modules/react-form-builder2/lib/language-provider/IntlMessages.js';

// import { useDispatch } from 'react-redux';
// import { connect } from 'react-redux';

import { addCondition } from '../../redux/transfer/conditionalSlice';

import { connect } from 'react-redux';
import {
  setLabelNamemultilineInput,
  addLabelNamemultilineInput,
  removeLabelNamemultilineInput,
  addInputmultilineInput,
  removeInputmultilineInput,
  setInputNamemultilineInput,
  setInputTypemultilineInput,
  updateObjectmultilineInput,
  setIDmultilineInput,
  appendNewComponentmultilineInput,
} from '../../redux/transfer/multilineInputDetails';
import {
  setLabelName,
  addLabelName,
  removeLabelName,
  addInput,
  removeInput,
  setInputName,
  setInputType,
} from '../../redux/transfer/transferDetails';






const toolbar = {
  options: ['inline', 'list', 'textAlign', 'fontSize', 'link', 'history'],
  inline: {
    inDropdown: false,
    className: undefined,
    options: ['bold', 'italic', 'underline', 'superscript', 'subscript'],
  },
};

class FormElementsEdit extends React.Component {
  constructor(props) {
    super(props);

    // console.log(props)
    // console.log(props.data)
    this.state = {
      element: this.props.element,
      data: this.props.data,
      dirty: false,
    };
    // console.log("this.state.data", this.state.data)

  }



  //  dispatch = useDispatch();

  // handleIncrementButtonClick = () => {
  //   this.props.addCondition();
  // };



  // handleLabelNameChange = (event) => {
  //   this.props.setLabelName(event.target.value);
  // };
  // handleLabelNameChange = (index) => (event) => {
  //   this.props.setLabelName({ index, name: event.target.value });
  // };




  handleLabelNameChangeMultiInput = (index, multiId) => (event) => {
    console.log("multiId", multiId);
    this.props.setLabelNamemultilineInput({ index, multiId, name: event.target.value });
  };

  handleAddLabelNameMultiInput = (multiId) => () => {
    // console.log
    console.log("ID", multiId);
    this.props.addLabelNamemultilineInput(multiId);
  };

  handleRemoveLabelNameMultiInput = (index, multiId) => () => {
    console.log("id", multiId)
    this.props.removeLabelNamemultilineInput({ index, multiId });
  };

  handleAddInputMultiInput = (index, multiId) => () => {
    console.log('id', multiId)
    this.props.addInputmultilineInput({ index, multiId });
  };

  handleRemoveInputMultiInput = (conditionIndex, inputIndex, multiId) => () => {
    this.props.removeInputmultilineInput({ conditionIndex, inputIndex, multiId });
  };
  handleInputNameChangeMultiInput = (conditionIndex, inputIndex, multiId) => (event) => {
    console.log("ID", multiId);

    this.props.setInputNamemultilineInput({
      conditionIndex,
      inputIndex,
      name: event.target.value, multiId
    });
  };
  handleInputTypeChangeMultiInput = (conditionIndex, inputIndex, multiId) => (event) => {
    this.props.setInputTypemultilineInput({
      conditionIndex,
      inputIndex,
      inputType: event.target.value,
      multiId
    });
  };






  handleLabelNameChange = (index, id) => (event) => {
    console.log(index);
    // console.log(this.props.label[0].names)

    // console.log("ID", id);
    // console.log(event.target.value);
    this.props.setLabelName({ index, id, name: event.target.value });

    // try{
    //   this.props.setLabelName({ index,id, name: event.target.value});

    // }catch(e){
    //   this.props.setLabelName({ index,id, name: event.target.value});

    // }

    // this.props.label[0].setLabelName({ index, name: event.target.value,  });

  };

  handleAddLabelName = (id) => () => {
    // console.log
    console.log("ID", id);
    this.props.addLabelName(id);
  };

  handleRemoveLabelName = (index, id) => () => {
    console.log("id", id)
    this.props.removeLabelName({ index, id });
  };

  handleAddInput = (index, id) => () => {
    console.log('id', id)
    this.props.addInput({ index, id });
  };

  handleRemoveInput = (conditionIndex, inputIndex, id) => () => {
    this.props.removeInput({ conditionIndex, inputIndex, id });
  };
  handleInputNameChange = (conditionIndex, inputIndex, id) => (event) => {
    console.log("ID", id);

    this.props.setInputName({
      conditionIndex,
      inputIndex,
      name: event.target.value, id
    });
  };
  handleInputTypeChange = (conditionIndex, inputIndex, id) => (event) => {
    this.props.setInputType({
      conditionIndex,
      inputIndex,
      inputType: event.target.value,
      id
    });
  };



  // handleOptionChange = (conditionIndex, inputIndex, optionIndex) => (event) => {
  //   // Update option in Redux store
  // };

  // handleAddOption = (conditionIndex, inputIndex) => () => {
  //   // Add new option in Redux store
  // };

  // handleRemoveOption = (conditionIndex, inputIndex, optionIndex) => () => {
  //   // Remove option from Redux store
  // };






  toggleRequired() {
    // const this_element = this.state.element;
  }

  editElementProp(elemProperty, targProperty, e) {
    // elemProperty could be content or label
    // targProperty could be value or checked
    const this_element = this.state.element;
    this_element[elemProperty] = e.target[targProperty];

    this.setState({
      element: this_element,
      dirty: true,
    }, () => {
      if (targProperty === 'checked') { this.updateElement(); }
    });
  }

  onEditorStateChange(index, property, editorContent) {
    // const html = draftToHtml(convertToRaw(editorContent.getCurrentContent())).replace(/<p>/g, '<div>').replace(/<\/p>/g, '</div>');
    const html = draftToHtml(convertToRaw(editorContent.getCurrentContent())).replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/&nbsp;/g, ' ')
      .replace(/(?:\r\n|\r|\n)/g, ' ');
    const this_element = this.state.element;
    this_element[property] = html;

    this.setState({
      element: this_element,
      dirty: true,
    });
  }

  updateElement() {
    const this_element = this.state.element;
    // to prevent ajax calls with no change
    if (this.state.dirty) {
      this.props.updateElement.call(this.props.preview, this_element);
      this.setState({ dirty: false });
    }
  }

  convertFromHTML(content) {
    const newContent = convertFromHTML(content);
    if (!newContent.contentBlocks || !newContent.contentBlocks.length) {
      // to prevent crash when no contents in editor
      return EditorState.createEmpty();
    }
    const contentState = ContentState.createFromBlockArray(newContent);
    return EditorState.createWithContent(contentState);
  }

  addOptions() {
    const optionsApiUrl = document.getElementById('optionsApiUrl').value;
    if (optionsApiUrl) {
      get(optionsApiUrl).then(data => {
        this.props.element.options = [];
        const { options } = this.props.element;
        data.forEach(x => {
          // eslint-disable-next-line no-param-reassign
          x.key = ID.uuid();
          options.push(x);
        });
        const this_element = this.state.element;
        this.setState({
          element: this_element,
          dirty: true,
        });
      });
    }
  }



  // updateChoices(choices) {
  //   const this_element = this.state.element;
  //   this_element.choices = choices;
  //   this.setState({ element: this_element, dirty: true });
  // }

  // addChoice() {
  //   const choices = this.state.element?.choices?.slice();
  //   choices?.push({ value: `choice${choices.length + 1}`, label: `Choice ${choices.length + 1}`, input: '' });
  //   this.updateChoices(choices);
  // }

  // editChoice(index, key, value) {
  //   const choices = this.state.element.choices.slice();
  //   choices[index][key] = value;
  //   this.updateChoices(choices);
  // }

  // deleteChoice(index) {
  //   const choices = this.state.element.choices.slice();
  //   choices.splice(index, 1);
  //   this.updateChoices(choices);
  // }

  // handleAddCondition = (props) => {
  //   console.log(props)
  //   // const newData = { ...data };
  //   // const newData 
  //   // newData.props.options.push({ value: '', label: '', inputs: [{ type: 'text' }] });
  //   // props.updateElement(newData);
  // };

  handleAddCondition = () => {
    console.log('testing')
    // const this_element = this.state.element;
    // console.log(this_element)
    console.log(this.state)
    // if (this_element.key === 'MyConditionalInput') {
    //   console.log('coming insid')
    //   this_element.options.push({ value: '', label: '', inputs: [{ type: 'text' }] });
    //   this.setState({ element: this_element, dirty: true });

    // }
    const this_element = this.state.element;
    console.log(this_element)
    console.log(this_element.options)
    // if (this_element.component === 'MyConditionalInput') {
    this_element.options?.push({ value: '', label: '', inputs: [{ type: 'text' }] });
    this.setState({ element: this_element, dirty: true });
    console.log(this.element)
    // }
  };




  render() {

    // const { labelNames, inputs, inputTypes } = this.props;



    const { label } = this.props;
    const {multilineInput} = this.props;

    console.log(this.props)
    var current_component_MultiInput = multilineInput.filter((val)=> {return val.id == this.props.element.id})
console.log(current_component_MultiInput, "current_component_MultiInput")
var multiLabelNames =[];
var multiInputs = [];
var multiInputTypes = [];
var multiId ="";
if (current_component_MultiInput.length > 0) {
  multiId = current_component_MultiInput[0].id;
  multiLabelNames = current_component_MultiInput[0].names;
 multiInputs = current_component_MultiInput[0].inputs;
 multiInputTypes = current_component_MultiInput[0].inputTypes;


  console.log("label name filtered", multiLabelNames)
  console.log('My element edit  inputs', multiId);

}

    var current_component = label.filter((val) => { return val.id == this.props.element.id })

    console.log(current_component);
    var labelNames = [];
    var inputs = [];
    var inputTypes = [];
    var id = "";

    if (current_component.length > 0) {
      id = current_component[0].id;
      labelNames = current_component[0].names;
      inputs = current_component[0].inputs;
      inputTypes = current_component[0].inputTypes;


      console.log("label name filtered", labelNames)
      console.log('My element edit  inputs', inputs);

    }

    if (this.state.dirty) {
      this.props.element.dirty = true;
    }

    const this_checked = this.props.element.hasOwnProperty('required') ? this.props.element.required : false;
    const this_read_only = this.props.element.hasOwnProperty('readOnly') ? this.props.element.readOnly : false;
    const this_default_today = this.props.element.hasOwnProperty('defaultToday') ? this.props.element.defaultToday : false;
    const this_show_time_select = this.props.element.hasOwnProperty('showTimeSelect') ? this.props.element.showTimeSelect : false;
    const this_show_time_select_only = this.props.element.hasOwnProperty('showTimeSelectOnly') ? this.props.element.showTimeSelectOnly : false;
    const this_show_time_input = this.props.element.hasOwnProperty('showTimeInput') ? this.props.element.showTimeInput : false;
    const this_checked_inline = this.props.element.hasOwnProperty('inline') ? this.props.element.inline : false;
    const this_checked_bold = this.props.element.hasOwnProperty('bold') ? this.props.element.bold : false;
    const this_checked_italic = this.props.element.hasOwnProperty('italic') ? this.props.element.italic : false;
    const this_checked_center = this.props.element.hasOwnProperty('center') ? this.props.element.center : false;
    const this_checked_page_break = this.props.element.hasOwnProperty('pageBreakBefore') ? this.props.element.pageBreakBefore : false;
    const this_checked_alternate_form = this.props.element.hasOwnProperty('alternateForm') ? this.props.element.alternateForm : false;

    const {
      canHavePageBreakBefore, canHaveAlternateForm, canHaveDisplayHorizontal, canHaveOptionCorrect, canHaveOptionValue,
    } = this.props.element;
    const canHaveImageSize = (this.state.element.element === 'Image' || this.state.element.element === 'Camera');

    const this_files = this.props.files.length ? this.props.files : [];
    if (this_files.length < 1 || (this_files.length > 0 && this_files[0].id !== '')) {
      this_files.unshift({ id: '', file_name: '' });
    }

    let editorState;
    if (this.props.element.hasOwnProperty('content')) {
      editorState = this.convertFromHTML(this.props.element.content);
    }
    if (this.props.element.hasOwnProperty('label')) {
      editorState = this.convertFromHTML(this.props.element.label);
    }
    return (
      <div>
        <div className="clearfix">
          <h4 className="float-left">{this.props.element.text}</h4>
          <i className="float-right fas fa-times dismiss-edit" onClick={this.props.manualEditModeOff}></i>
        </div>
        {this.props.element.hasOwnProperty('content') &&
          <div className="form-group">
            <label className="control-label"><IntlMessages id="text-to-display" />:</label>

            <Editor
              toolbar={toolbar}
              defaultEditorState={editorState}
              onBlur={this.updateElement.bind(this)}
              onEditorStateChange={this.onEditorStateChange.bind(this, 0, 'content')}
              stripPastedStyles={true} />
          </div>
        }
        {this.props.element.hasOwnProperty('file_path') &&
          <div className="form-group">
            <label className="control-label" htmlFor="fileSelect"><IntlMessages id="choose-file" />:</label>
            <select id="fileSelect" className="form-control" defaultValue={this.props.element.file_path} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'file_path', 'value')}>
              {this_files.map((file) => {
                const this_key = `file_${file.id}`;
                return <option value={file.id} key={this_key}>{file.file_name}</option>;
              })}
            </select>
          </div>
        }
        {this.props.element.hasOwnProperty('href') &&
          <div className="form-group">
            <TextAreaAutosize type="text" className="form-control" defaultValue={this.props.element.href} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'href', 'value')} />
          </div>
        }
        {this.props.element.hasOwnProperty('label') &&
          <div className="form-group">
            <label><IntlMessages id="display-label" /></label>
            <Editor
              toolbar={toolbar}
              defaultEditorState={editorState}
              onBlur={this.updateElement.bind(this)}
              onEditorStateChange={this.onEditorStateChange.bind(this, 0, 'label')}
              stripPastedStyles={true} />
            <br />
            <div className="custom-control custom-checkbox">
              <input id="is-required" className="custom-control-input" type="checkbox" checked={this_checked} value={true} onChange={this.editElementProp.bind(this, 'required', 'checked')} />
              <label className="custom-control-label" htmlFor="is-required">
                <IntlMessages id="required" />
              </label>
            </div>
            {this.props.element.hasOwnProperty('readOnly') &&
              <div className="custom-control custom-checkbox">
                <input id="is-read-only" className="custom-control-input" type="checkbox" checked={this_read_only} value={true} onChange={this.editElementProp.bind(this, 'readOnly', 'checked')} />
                <label className="custom-control-label" htmlFor="is-read-only">
                  <IntlMessages id="read-only" />
                </label>
              </div>
            }
            {this.props.element.hasOwnProperty('defaultToday') &&
              <div className="custom-control custom-checkbox">
                <input id="is-default-to-today" className="custom-control-input" type="checkbox" checked={this_default_today} value={true} onChange={this.editElementProp.bind(this, 'defaultToday', 'checked')} />
                <label className="custom-control-label" htmlFor="is-default-to-today">
                  <IntlMessages id="default-to-today" />?
                </label>
              </div>
            }
            {this.props.element.hasOwnProperty('showTimeSelect') &&
              <div className="custom-control custom-checkbox">
                <input id="show-time-select" className="custom-control-input" type="checkbox" checked={this_show_time_select} value={true} onChange={this.editElementProp.bind(this, 'showTimeSelect', 'checked')} />
                <label className="custom-control-label" htmlFor="show-time-select">
                  <IntlMessages id="show-time-select" />?
                </label>
              </div>
            }
            {this_show_time_select && this.props.element.hasOwnProperty('showTimeSelectOnly') &&
              <div className="custom-control custom-checkbox">
                <input id="show-time-select-only" className="custom-control-input" type="checkbox" checked={this_show_time_select_only} value={true} onChange={this.editElementProp.bind(this, 'showTimeSelectOnly', 'checked')} />
                <label className="custom-control-label" htmlFor="show-time-select-only">
                  <IntlMessages id="show-time-select-only" />?
                </label>
              </div>
            }
            {this.props.element.hasOwnProperty('showTimeInput') &&
              <div className="custom-control custom-checkbox">
                <input id="show-time-input" className="custom-control-input" type="checkbox" checked={this_show_time_input} value={true} onChange={this.editElementProp.bind(this, 'showTimeInput', 'checked')} />
                <label className="custom-control-label" htmlFor="show-time-input">
                  <IntlMessages id="show-time-input" />?
                </label>
              </div>
            }
            {(this.state.element.element === 'RadioButtons' || this.state.element.element === 'Checkboxes') && canHaveDisplayHorizontal &&
              <div className="custom-control custom-checkbox">
                <input id="display-horizontal" className="custom-control-input" type="checkbox" checked={this_checked_inline} value={true} onChange={this.editElementProp.bind(this, 'inline', 'checked')} />
                <label className="custom-control-label" htmlFor="display-horizontal">
                  <IntlMessages id="display-horizontal" />
                </label>
              </div>
            }
          </div>
        }
        {this.props.element.hasOwnProperty('src') &&
          <div>
            <div className="form-group">
              <label className="control-label" htmlFor="srcInput"><IntlMessages id="link-to" />:</label>
              <input id="srcInput" type="text" className="form-control" defaultValue={this.props.element.src} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'src', 'value')} />
            </div>
          </div>
        }
        {canHaveImageSize &&
          <div>
            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input id="do-center" className="custom-control-input" type="checkbox" checked={this_checked_center} value={true} onChange={this.editElementProp.bind(this, 'center', 'checked')} />
                <label className="custom-control-label" htmlFor="do-center">
                  <IntlMessages id="center" />?
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <label className="control-label" htmlFor="elementWidth"><IntlMessages id="width" />:</label>
                <input id="elementWidth" type="text" className="form-control" defaultValue={this.props.element.width} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'width', 'value')} />
              </div>
              <div className="col-sm-3">
                <label className="control-label" htmlFor="elementHeight"><IntlMessages id="height" />:</label>
                <input id="elementHeight" type="text" className="form-control" defaultValue={this.props.element.height} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'height', 'value')} />
              </div>
            </div>
          </div>
        }
        {this.state.element.element === 'FileUpload' && (
          <div>
            <div className='form-group'>
              <label className='control-label' htmlFor='fileType'>
                <IntlMessages id='choose-file-type' />:
              </label>
              <select
                id='fileType'
                className="form-control"
                onBlur={this.updateElement.bind(this)}
                onChange={this.editElementProp.bind(this, 'fileType', 'value')}
              >
                {[
                  {
                    type: 'image, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, video/mp4,video/x-m4v,video/*',
                    typeName: 'All File Type',
                  },
                  { type: 'image', typeName: 'Image' },
                  { type: 'application/pdf', typeName: 'PDF' },
                  {
                    type: 'application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    typeName: 'Word',
                  },
                  {
                    type: 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    typeName: 'Excel',
                  },
                  {
                    type: 'application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation',
                    typeName: 'Powerpoint',
                  },
                  {
                    type: 'video/mp4,video/x-m4v,video/*',
                    typeName: 'Videos',
                  },
                ].map((file, index) => (
                  <option value={file.type} key={index}>
                    {file.typeName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        {this.state.element.element === 'Signature' && this.props.element.readOnly
          ? (
            <div className="form-group">
              <label className="control-label" htmlFor="variableKey"><IntlMessages id="variable-key" />:</label>
              <input id="variableKey" type="text" className="form-control" defaultValue={this.props.element.variableKey} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'variableKey', 'value')} />
              <p className="help-block"><IntlMessages id="variable-key-desc" />.</p>
            </div>
          )
          : (<div />)
        }

        {canHavePageBreakBefore &&
          <div className="form-group">
            <label className="control-label"><IntlMessages id="print-options" /></label>
            <div className="custom-control custom-checkbox">
              <input id="page-break-before-element" className="custom-control-input" type="checkbox" checked={this_checked_page_break} value={true} onChange={this.editElementProp.bind(this, 'pageBreakBefore', 'checked')} />
              <label className="custom-control-label" htmlFor="page-break-before-element">
                <IntlMessages id="page-break-before-elements" />?
              </label>
            </div>
          </div>
        }

        {canHaveAlternateForm &&
          <div className="form-group">
            <label className="control-label"><IntlMessages id="alternate-signature-page" /></label>
            <div className="custom-control custom-checkbox">
              <input id="display-on-alternate" className="custom-control-input" type="checkbox" checked={this_checked_alternate_form} value={true} onChange={this.editElementProp.bind(this, 'alternateForm', 'checked')} />
              <label className="custom-control-label" htmlFor="display-on-alternate">
                <IntlMessages id="display-on-alternate-signature-page" />?
              </label>
            </div>
          </div>
        }
        {this.props.element.hasOwnProperty('step') &&
          <div className="form-group">
            <div className="form-group-range">
              <label className="control-label" htmlFor="rangeStep"><IntlMessages id="step" /></label>
              <input id="rangeStep" type="number" className="form-control" defaultValue={this.props.element.step} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'step', 'value')} />
            </div>
          </div>
        }
        {this.props.element.hasOwnProperty('min_value') &&
          <div className="form-group">
            <div className="form-group-range">
              <label className="control-label" htmlFor="rangeMin"><IntlMessages id="min" /></label>
              <input id="rangeMin" type="number" className="form-control" defaultValue={this.props.element.min_value} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'min_value', 'value')} />
              <input type="text" className="form-control" defaultValue={this.props.element.min_label} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'min_label', 'value')} />
            </div>
          </div>
        }
        {this.props.element.hasOwnProperty('max_value') &&
          <div className="form-group">
            <div className="form-group-range">
              <label className="control-label" htmlFor="rangeMax"><IntlMessages id="max" /></label>
              <input id="rangeMax" type="number" className="form-control" defaultValue={this.props.element.max_value} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'max_value', 'value')} />
              <input type="text" className="form-control" defaultValue={this.props.element.max_label} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'max_label', 'value')} />
            </div>
          </div>
        }
        {this.props.element.hasOwnProperty('default_value') &&
          <div className="form-group">
            <div className="form-group-range">
              <label className="control-label" htmlFor="defaultSelected"><IntlMessages id="default-selected" /></label>
              <input id="defaultSelected" type="number" className="form-control" defaultValue={this.props.element.default_value} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'default_value', 'value')} />
            </div>
          </div>
        }
        {this.props.element.hasOwnProperty('static') && this.props.element.static &&
          <div className="form-group">
            <label className="control-label"><IntlMessages id="text-style" /></label>
            <div className="custom-control custom-checkbox">
              <input id="do-bold" className="custom-control-input" type="checkbox" checked={this_checked_bold} value={true} onChange={this.editElementProp.bind(this, 'bold', 'checked')} />
              <label className="custom-control-label" htmlFor="do-bold">
                <IntlMessages id="bold" />
              </label>
            </div>
            <div className="custom-control custom-checkbox">
              <input id="do-italic" className="custom-control-input" type="checkbox" checked={this_checked_italic} value={true} onChange={this.editElementProp.bind(this, 'italic', 'checked')} />
              <label className="custom-control-label" htmlFor="do-italic">
                <IntlMessages id="italic" />
              </label>
            </div>
          </div>
        }
        {this.props.element.showDescription &&
          <div className="form-group">
            <label className="control-label" htmlFor="questionDescription"><IntlMessages id="description" /></label>
            <TextAreaAutosize type="text" className="form-control" id="questionDescription" defaultValue={this.props.element.description} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'description', 'value')} />
          </div>
        }
        {this.props.showCorrectColumn && this.props.element.canHaveAnswer && !this.props.element.hasOwnProperty('options') &&
          <div className="form-group">
            <label className="control-label" htmlFor="correctAnswer"><IntlMessages id="correct-answer" /></label>
            <input id="correctAnswer" type="text" className="form-control" defaultValue={this.props.element.correct} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'correct', 'value')} />
          </div>
        }
        {this.props.element.canPopulateFromApi && this.props.element.hasOwnProperty('options') &&
          <div className="form-group">
            <label className="control-label" htmlFor="optionsApiUrl"><IntlMessages id="populate-options-from-api" /></label>
            <div className="row">
              <div className="col-sm-6">
                <input className="form-control" style={{ width: '100%' }} type="text" id="optionsApiUrl" placeholder="http://localhost:8080/api/optionsdata" />
              </div>
              <div className="col-sm-6">
                <button onClick={this.addOptions.bind(this)} className="btn btn-success"><IntlMessages id="populate" /></button>
              </div>
            </div>
          </div>
        }
        {this.props.element.hasOwnProperty('options') &&
          <DynamicOptionList showCorrectColumn={this.props.showCorrectColumn}
            canHaveOptionCorrect={canHaveOptionCorrect}
            canHaveOptionValue={canHaveOptionValue}
            data={this.props.preview.state.data}
            updateElement={this.props.updateElement}
            preview={this.props.preview}
            element={this.props.element}
            key={this.props.element.options.length} />
        }
        {console.log(this.props.element.hasOwnProperty('custom'))}
        {console.log(this.props.element.hasOwnProperty('options'))}
        {console.log(this.props.element.key)}
        {/* {this.props.element.hasOwnProperty('custom')&& */}
        
        {this.props.element?.key === "MyDataGrid" &&
          <div className="form-group">
            <div>
              {multiLabelNames.map((labelName, index) => (
                <div key={index}>
                  <label>
                    Label name {index + 1}:
                    <input
                      type="text"
                      value={labelName}
                      onChange={this.handleLabelNameChangeMultiInput(index, multiId)}
                    />
                  </label>
                  {multiLabelNames.length > 1 && (
                    <button onClick={this.handleRemoveLabelNameMultiInput(index, multiId)}>
                      Remove Label Name
                    </button>
                  )}
                  <div>
                    {multiInputs[index].map((inputLabel, inputIndex) => (
                      <div key={inputIndex}>
                        <label>
                          Input label {inputIndex + 1}:
                          <input
                            type="text"
                            value={inputLabel}
                            onChange={this.handleInputNameChangeMultiInput(index, inputIndex, multiId)}
                          />
                        </label>
                        <label>
                          Input type:
                          <select
                            value={multiInputTypes[index][inputIndex]}
                            onChange={this.handleInputTypeChangeMultiInput(index, inputIndex, multiId)}
                          >
                            <option value="text">Text</option>
                            <option value="number">Number</option>
                          </select>
                        </label>
                        {multiInputs[index].length > 1 && (
                          <button
                            onClick={this.handleRemoveInputMultiInput(index, inputIndex, multiId)}
                          >
                            Remove Input
                          </button>
                        )}
                      </div>
                    ))}
                    <button onClick={this.handleAddInputMultiInput(index, multiId)}>Add Input</button>
                  </div>
                </div>
              ))}
              <button onClick={this.handleAddLabelNameMultiInput(multiId)}>Add Label Name</button>
            </div>
          </div>
        }
        {this.props.element?.key === "MyConditionalInput" &&
          <div className="form-group">
            {/* <button onClick={() => this.handleAddCondition()}>Add Condition</button> */}
            {/* {JSON.stringify(this.props.preview.state)} */}
            {/* <button onClick={() => this.handleAddCondition()}>Add Condition</button>

        <button onClick={() => this.handleincrementButtonClick()}>Add Condition</button>; */}
            {console.log("props checsking", this.props)}


            {/* with input type  */}
            <div>
              {labelNames.map((labelName, index) => (
                <div key={index}>
                  <label>
                    Label name {index + 1}:
                    <input
                      type="text"
                      value={labelName}
                      onChange={this.handleLabelNameChange(index, id)}
                    />
                  </label>
                  {labelNames.length > 1 && (
                    <button onClick={this.handleRemoveLabelName(index, id)}>
                      Remove Label Name
                    </button>
                  )}
                  <div>
                    {inputs[index].map((inputLabel, inputIndex) => (
                      <div key={inputIndex}>
                        <label>
                          Input label {inputIndex + 1}:
                          <input
                            type="text"
                            value={inputLabel}
                            onChange={this.handleInputNameChange(index, inputIndex, id)}
                          />
                        </label>
                        <label>
                          Input type:
                          <select
                            value={inputTypes[index][inputIndex]}
                            onChange={this.handleInputTypeChange(index, inputIndex, id)}
                          >
                            <option value="text">Text</option>
                            <option value="number">Number</option>
                            <option value="file">File</option>
                            <option value="dropdown">Dropdown</option>
                          </select>
                        </label>
                        {/* {inputTypes[index][inputIndex] === 'dropdown' && (
      <div>
        <label>Options:</label>
        {inputOptions[index][inputIndex].map((option, optionIndex) => (
          <div key={optionIndex}>
            <input
              type="text"
              value={option}
              onChange={this.handleOptionChange(index, inputIndex, optionIndex)}
            />
            {inputOptions[index][inputIndex].length > 1 && (
              <button onClick={this.handleRemoveOption(index, inputIndex, optionIndex)}>
                Remove Option
              </button>
            )}
          </div>
        ))}
        <button onClick={this.handleAddOption(index, inputIndex)}>Add Option</button>
      </div>
    )} */}
                        {inputs[index].length > 1 && (
                          <button
                            onClick={this.handleRemoveInput(index, inputIndex, id)}
                          >
                            Remove Input
                          </button>
                        )}
                      </div>
                    ))}
                    <button onClick={this.handleAddInput(index, id)}>Add Input</button>
                  </div>
                </div>
              ))}
              <button onClick={this.handleAddLabelName(id)}>Add Label Name</button>
            </div>

            {/* {this.state.element.options?.map((option, index) => (
        <div key={index}>
          <input
            type="text"
            defaultValue={option.label}
            onBlur={(e) => this.handleEditOption(index, 'label', e.target.value)}
          />
        </div>
      ))} */}


            {/* <p>{console.log('testing')}</p>

           <label>Choices</label>

           {this.state.element?.choices?.map((choice, index) => (
             <div key={index}>
               <div className="form-inline">
                 <input
                   type="text"
                   className="form-control"
                   defaultValue={choice.label}
                   onBlur={(e) => this.editChoice(index, 'label', e.target.value)}
                 />
                 <button
                   className="btn btn-danger"
                   onClick={() => this.deleteChoice(index)}
                 >
                   Delete
                 </button>
               </div>
               <div className="form-group">
                 <label>Input Type</label>
                 <select
                   className="form-control"
                   defaultValue={choice.input}
                   onBlur={(e) => this.editChoice(index, 'input', e.target.value)}
                 >
                   <option value="">None</option>
                   <option value="text">Text</option>
                   <option value="file">File</option>
                 </select>
               </div>
             </div>
           ))}
           <button className="btn btn-success" onClick={() => this.addChoice()}>
             Add Choice
           </button> */}
          </div>
        }


      </div>
    );
  }
}
// const mapDispatchToProps = { addCondition };

// export default connect(null, mapDispatchToProps)(FormElementsEdit);
// FormElementsEdit.defaultProps = { className: 'edit-element-fields' };
FormElementsEdit.defaultProps = { className: 'edit-element-fields' };

// const mapStateToProps = (state) => ({
//   labelName: state.label.name,
// });

const mapStateToProps = (state) => ({
  label: state.label,
  multilineInput: state.multilineInput,

  // inputOptions: state.label.inputOptions,

  // labelNames: state.label.names,
  // inputs: state.label.inputs,
  // inputTypes: state.label.inputTypes,

})

const mapDispatchToProps = {
  setLabelName,
  addLabelName,
  removeLabelName,
  addInput,
  removeInput,
  setInputName,
  setInputType,
  setLabelNamemultilineInput,
  addLabelNamemultilineInput,
  removeLabelNamemultilineInput,
  addInputmultilineInput,
  removeInputmultilineInput,
  setInputNamemultilineInput,
  setInputTypemultilineInput,
  updateObjectmultilineInput,
  setIDmultilineInput,
  appendNewComponentmultilineInput,
};



export default connect(mapStateToProps, mapDispatchToProps)(FormElementsEdit);



// import React from 'react';
// import { FormElementsEdit } from 'react-form-builder2/lib/form-elements-edit';

// const MyFormElementsEdit = (props) => {
//   const { data } = props;

//   const handleAddCondition = () => {
//     const newData = { ...data };
//     newData.props.options.push({ value: '', label: '', inputs: [{ type: 'text' }] });
//     props.updateElement(newData);
//   };

//   return (
//     <>
//       <FormElementsEdit {...props} />
//       {/* {data.element === 'CustomElement' && data.component === 'MyConditionalInput' && (
//         <button onClick={handleAddCondition}>Add Condition</button>
//       )} */}
//     </>
//   );
// };

// export default MyFormElementsEdit;
