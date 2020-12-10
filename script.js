$(document).ready(function (){
    $('tbody').request();
})

$('#setActive,#setActiveBottom').change(function (){
    $('#setActive,#setActiveBottom').val($(this).val());
})

$('#checkAll').click(function () {
    $('input[type=checkbox]').not('#customSwitch').prop('checked', this.checked);
})

$('#submitTable,#submitTableBottom').click(function () {
    let ids=[];
    let action;
    let status;
    let flag = $('#setActive').val();
    $('input:checkbox').not('#customSwitch, #checkAll').each(function(){
        if($(this).is(':checked')){
            ids.push($(this).attr('id').substr($(this).attr('id').indexOf('_')+1));
        }
    })
    if (flag === '0') {
        $(this).showMessage('Select any action.');
    } else if (ids.length === 0) {
        $(this).showMessage('Select any user.');
    } else {
        switch (flag) {
            case 'active':
                action = 'active';
                status = 1;
                break;
            case 'not_active':
                action = 'not_active';
                status = 0;
                break;
            case 'delete':
                action = 'delete';
                break;
        }
        let params = {
            action: action,
            status: status,
            id: ids
        }
        if (action === 'delete') {
            $(this).showMessage('Confirm deleting.');
            $('#acceptAction').click(function () {
                $(this).request(params);
            })
        } else {
            $(this).request(params);
        }
    }
})

$('#modal, #modalBottom').click(function () {
    let $add = $('#addUser');
    let $edit = $('#editUser');
    $(this).showBlankForm();
    $add.css('display','inline-block');
    $edit.css('display','none');
    $('#modalForm').modal();
    $add.click(function () {
        $(this).sendForm('add');
    });
})

$.fn.extend({
    checkboxesSelection: function () {
        $('input[type=checkbox]').not('#customSwitch,#checkAll').click(function () {
            if ($('input:checked').not('#customSwitch,#checkAll').length === $('input[type=checkbox]').not('#customSwitch,#checkAll').length) {
                $('#checkAll').prop('checked', true)
            } else {
                $('#checkAll').prop('checked', false)
            }
        })
    },
    createRow: function(element,isActiveClass) {
        let table;
        table = '<tr id="'+ element['id'] +'"><td><label for="' + element['id'] + '"><input id=select_' + element['id'] + ' type="checkbox"></label></td>'+
            '<td><span class="name">'+element['name']+'</span><span class="surname"> '+element['surname']+'</span></td>'+
            '<td class="text-center"><span class="'+ isActiveClass +'"></span>'+'</td>'+
            '<td class="text-center">' + element['role'] + '</td>' +
            '<td style="width: 20%;">' +
            '<a id="edit_'+ element['id'] +'" href="#" class="table-link">' +
            '<span class="fa-stack">' +
            '<i class="fa fa-square fa-stack-2x"></i>' +
            '<i class="fa fa-pencil fa-stack-1x fa-inverse"></i>' +
            '</span>' +
            '</a>' +
            '<a id="delete_'+ element['id'] +'" href="#" class="table-link danger" >' +
            '<span class="fa-stack" >' +
            '<i class="fa fa-square fa-stack-2x"></i>' +
            '<i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>' +
            '</span>' +
            '</a>' +
            '</td></tr>';
        return table;
    },
    request: function(params) {
        $('#checkAll').prop('checked',false);
        $('#acceptAction').unbind();
        $('#addUser').unbind();
        $('#editUser').unbind();
        $.ajax({
            type: "POST",
            url: "/source.php",
            data: {
                params
            }
        }).done(function(result){
            console.log($.parseJSON(result));
            let isActiveClass, table = '';
            $($.parseJSON(result)).each(function (index,element) {
                if (element['status'] === '0') isActiveClass='dot-not-active';
                else isActiveClass = 'dot-active';
                table += $(this).createRow(element,isActiveClass);
            })
            $('tbody').html(table);
            $('input:checkbox').on('click',function (){
                $('input:checkbox').checkboxesSelection();
            });

            $('.fa-pencil').on('click',function () {
                let id = $(this).closest('a').attr('id');
                id = id.substr(id.indexOf('_')+1)
                let $add = $('#addUser');
                let $edit = $('#editUser');
                $add.css('display','none');
                $edit.css('display','inline-block');
                $(this).showEditingUser(id);
                $('#modalForm').modal();
                $edit.click({value:id},function () {
                    $(this).sendForm('edit',id);
                })
            });

            $('.fa-trash-o').on('click',function () {
                let id = $(this).closest('a').attr('id');
                id = id.substr(id.indexOf('_')+1)
                let params = {
                    action: 'delete',
                    id: id
                };
                $(this).showMessage('Confirm deleting.');
                $('#acceptAction').click( {value: params},function () {
                    $(this).request(params);
                });
            });
        }).fail(function(){
            $('tbody').empty();
            $(this).showMessage('Table is empty');
        })
    },
    showMessage: function(message) {
        $('body').off('click','#acceptAction');
        $('#modalMessage .modal-body').html(message);
        $('#modalMessage').modal({
            backdrop: 'static'
        });
    },
    sendForm: function(action,id) {
        if(!($('#setRole').val() === '0' || $('#name').val().length === 0 || $('#surname').val().length === 0)) {
            $('#addUser, #editUser').attr('data-dismiss','modal');
            let params = {
                action: action,
                id: id
            }
            $($('form').serializeArray()).each(function (key, value) {
                params[value['name']] = value['value'];
            });
            $(this).request(params);
        } else {
            $('#addUser, #editUser').removeAttr('data-dismiss');
            $(this).showMessage('Check text inputs and select role.');
        }
    },
    showEditingUser: function(id) {
        $('#exampleModalLabel').html('Edit user');
        let selector = $('#'+id).children();
        $('#name').val($('#'+id+' .name').html());
        $('#surname').val($('#'+id+' .surname').html());
        if (selector.eq(2).children().hasClass('dot-active')) {
            $('#customSwitch').prop('checked',true);
        }
        else $('#customSwitch').prop('checked',false);
        $(this).renderSelectMenu(false);
        $('#setRole').val(selector.eq(3).html().toLowerCase());
    },
    showBlankForm: function() {
        $('#exampleModalLabel').html('Add user');
        $('#name').val('')
        $('#surname').val('');
        $('#customSwitch').prop('checked',false);
        $(this).renderSelectMenu(true);
        $('#setRole').val('0');
    },
    renderSelectMenu: function (state) {
        let role = $('#setRole');
        role.empty();
        if (state) {
            role.append('<option value="0" selected>1. Please select</option> + ' +
                '<option value="admin">2. Admin</option> + ' +
                '<option value="user">3. User</option>');
        }
        else {
            role.append('<option value="admin">1. Admin</option> + ' +
                '<option value="user">2. User</option>');
        }
    }
})
