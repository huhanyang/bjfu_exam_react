import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Collapse, PageHeader, Button, Checkbox, message, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import "antd/dist/antd.css"

import '../common/Common.css'
import * as Ajax from '../../util/Ajax'
import * as ProblemTypeEnum from '../../enum/ProblemTypeEnum'
import AddProblem from './AddProblem'
import * as FileUtil from '../../util/FileUtil'
import ImagesEdit from './ImagesEdit'
import EditProblem from './EditProblem';

const { Panel } = Collapse
const { confirm } = Modal;

class EditPaper extends Component {

    constructor(props) {
        super(props)
        this.state = {
            addProblemVisible: false,
            paper: null,
            fatherProblemId: null,
            deleteProblem: null,
            editProblem: null
        }
    }

    componentDidMount() {
        if (this.props.history.location.paperId != null) {
            this.getProblemsRequest(this.props.history.location.paperId)
        } else {
            message.warn('请先选择要编辑的试卷！');
            this.props.history.push('/paperList')
        }
    }

    getProblemsRequest = (paperId) => {
        Ajax.GET('/exam/paper/getByPaperId?paperId='+paperId, (res) => {
            this.setState({
                paper: res.data.object
            })
        }, this.props.history)
    }

    deleteProblemRequest = (paperId, problem) => {
        Ajax.DELETE('/exam/paper/deleteProblem?paperId='+paperId+'&problemId='+problem.id, (res) => {
            this.setState({deleteProblem: null});
            this.getProblemsRequest(paperId);
        }, this.props.history)
    }

    panelExtra = (problem) => (
        <>
            <EditOutlined onClick={(e) => {
                this.setState({ editProblem: problem });
                e.stopPropagation();
            }} />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <DeleteOutlined onClick={(e) => {
                this.setState({ deleteProblem: problem });
                e.stopPropagation();
            }} />
        </>
    );

    subProblemList = (fatherProblem) => {
        let subProblems = fatherProblem.subProblems
        let other = (problem) => {
            if (problem.type === ProblemTypeEnum.CHOICE_PROBLEM) {
                let choices = JSON.parse(problem.answer)
                return choices.map((choice) => <Checkbox>{choice}</Checkbox>);
            } else {
                return (<></>);
            }
        }
        let problemList = subProblems.map((problem) =>
            <Panel 
                header={'第' + problem.sort + '小题'} 
                key={problem.sort} 
                extra={this.panelExtra(problem)}
            >
                <h1>{problem.title}</h1>
                <h1>{problem.material}</h1>
                <ImagesEdit 
                    problemId={problem.id}
                    images={problem.images}
                />
                {other(problem)}
            </Panel>
        )
        return (
            <div>
                <Collapse>
                    {problemList}
                </Collapse>
                <br />
                <Button className="component-content-button" type="primary" onClick={() => {
                    this.setState({
                        addProblemVisible: true,
                        fatherProblemId: fatherProblem.id
                    })
                }}>创建新试题</Button>
            </div>
        )
    }



    problemList = () => {
        if (this.state.paper != null) {
            let problems = this.state.paper.problems;
            let other = (problem) => {
                if (problem.type === ProblemTypeEnum.CHOICE_PROBLEM) {
                    let choices = JSON.parse(problem.answer)
                    return choices.map((choice) => <Checkbox>{choice}</Checkbox>);
                } else if (problem.type === ProblemTypeEnum.FATHER_PROBLEM) {
                    return this.subProblemList(problem);
                }
            }
            return (
                <Collapse>
                    {problems.map((problem) =>
                        <Panel 
                            header={'第' + problem.sort + '题'} 
                            key={problem.sort} 
                            extra={this.panelExtra(problem)}
                        >
                            <h1>{problem.title}</h1>
                            <h1>{problem.material}</h1>
                            <ImagesEdit 
                                problemId={problem.id}
                                images={problem.images}
                            />
                            {other(problem)}
                        </Panel>
                    )}
                </Collapse>
            )
        } else {
            return (<></>);
        }
    }

    render() {
        return (
            <div className="createPaper">
                <PageHeader
                    className="site-page-header"
                    title="编辑试题"
                    onBack={() => this.props.history.goBack()}
                />
                <div className="component-content">
                    <this.problemList></this.problemList>
                    <br />
                    <Button className="component-content-button" type="primary" onClick={() => {
                        this.setState({
                            addProblemVisible: true,
                            fatherProblemId: null
                        })
                    }}>创建新试题</Button>
                    <AddProblem
                        visible={this.state.addProblemVisible}
                        paperId={this.props.history.location.paperId}
                        fatherProblemId={this.state.fatherProblemId}
                        visibleChange={() => {
                            this.setState({
                                addProblemVisible: !this.state.addProblemVisible,
                                fatherProblemId: null
                            })
                        }}
                        refreshProblems={this.getProblemsRequest}
                    />
                    {this.state.editProblem==null?<></>:
                    <EditProblem
                        visibleChange={() => {this.setState({ editProblem: null })}}
                        paperId={this.props.history.location.paperId}
                        editProblem={this.state.editProblem}
                        refreshProblems={this.getProblemsRequest}
                    />}
                    <Modal 
                        title="删除试题" 
                        visible={this.state.deleteProblem!=null} 
                        okText="删除"
                        cancelText="取消"
                        onOk={() => {
                            this.deleteProblemRequest(this.props.history.location.paperId, this.state.deleteProblem);
                        }} 
                        onCancel={() => {this.setState({deleteProblem: null});}}
                    >
                        <p>您确定要删除这道试题么?</p>
                    </Modal>
                </div>
            </div>
        )
    }

}

export default withRouter(EditPaper)
