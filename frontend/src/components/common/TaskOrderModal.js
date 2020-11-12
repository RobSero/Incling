import React from 'react'
import { Modal } from 'antd';
import { updateTileTaskOrderRequest } from '../../utils/api'

class TaskOrderModal extends React.Component {
  state = {
    visible: false,
    task_order: []
  };

  showModal = () => {
    if (this.props.tasks.length > 1) {
      this.setState({
        visible: true,
        task_order: []
      });
    }
  };

  handleOk = async () => {
    if (this.state.task_order.length === this.props.tasks.length) {
      this.props.updateTaskOrder(this.state.task_order)
      this.setState({
        visible: false,
      });
    }
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  updateTaskOrder = taskId => {
    if (!this.state.task_order.includes(taskId)) {
      console.log(taskId);
      this.setState({
        task_order: [...this.state.task_order, taskId]
      })
    }
  }

  render() {
    const { taskShow, tasks } = this.props
    const { task_order } = this.state
    return (
      <>
        <span onClick={this.showModal} className='task-number'>{taskShow + 1}/{tasks.length}</span>
        <Modal
          title="Change Task Order, please select all tasks"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {tasks.map(task => {
            return (
              <div key={task.id} className={`task-option ${task_order.includes(task.id) ? 'selected' : ''}`} onClick={() => { this.updateTaskOrder(task.id) }}>
                <p>{task.title}</p>
                {task_order.includes(task.id) ? <p>{task_order.indexOf(task.id) + 1}</p> : ''}
              </div>

            )
          })}

        </Modal>
      </>
    );
  }
}

export default TaskOrderModal