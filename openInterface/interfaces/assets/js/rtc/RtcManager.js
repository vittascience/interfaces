class RtcManager {
  constructor() {
    this.socket = null,
      this.eventsArray = ["move", "create", "delete", "selected", "change"],
      this.professionArray = [
        { name: "code.rtc.profession.chemist", icon: "Icon-1.svg" },
        { name: "code.rtc.profession.aeronaut", icon: "Icon-2.svg" },
        { name: "code.rtc.profession.aviator", icon: "Icon-3.svg" },
        { name: "code.rtc.profession.entomologist", icon: "Icon-4.svg" },
        { name: "code.rtc.profession.dronpilot", icon: "Icon-5.svg" },
        { name: "code.rtc.profession.dendrologist", icon: "Icon-6.svg" },
        { name: "code.rtc.profession.neurologist", icon: "Icon-7.svg" },
        { name: "code.rtc.profession.roboticist", icon: "Icon-8.svg" },
        { name: "code.rtc.profession.astronomer", icon: "Icon-9.svg" },
        { name: "code.rtc.profession.geneticist", icon: "Icon-10.svg" },
        { name: "code.rtc.profession.astrocat", icon: "Icon-11.svg" },
        { name: "code.rtc.profession.herborist", icon: "Icon-12.svg" },
        { name: "code.rtc.profession.meteor", icon: "Icon-13.svg" },
        { name: "code.rtc.profession.physicist", icon: "Icon-14.svg" },
        { name: "code.rtc.profession.astronaut", icon: "Icon-15.svg" },
        { name: "code.rtc.profession.ufo", icon: "Icon-16.svg" },
        { name: "code.rtc.profession.alien", icon: "Icon-17.svg" },
        { name: "code.rtc.profession.meteorologist", icon: "Icon-18.svg" },
        { name: "code.rtc.profession.celestialBody", icon: "Icon-19.svg" },
        { name: "code.rtc.profession.biologist", icon: "Icon-20.svg" },
        { name: "code.rtc.profession.magnet", icon: "Icon-21.svg" },
        { name: "code.rtc.profession.volcanologist", icon: "Icon-22.svg" },
        { name: "code.rtc.profession.virologist", icon: "Icon-23.svg" },
        { name: "code.rtc.profession.programer", icon: "Icon-24.svg" },
        { name: "code.rtc.profession.planet", icon: "Icon-25.svg" },
        { name: "code.rtc.profession.computerScientist", icon: "Icon-26.svg" },
      ],
      this.workspace = null,
      this.aceEditor = null,
      this.curMgr = null,
      this.aceRange = require('ace/range').Range,
      this.selMgr = null,
      this.divInterval = null,
      this.initSaveWarning = this.initSaveWarning.bind(this),
      this.initSocketUsers = this.initSocketUsers.bind(this),
      this.initSocketBlockly = this.initSocketBlockly.bind(this),
      this.initSocketAce = this.initSocketAce.bind(this),
      this.initSocketSave = this.initSocketSave.bind(this),
      this.initSocketDisconnect = this.initSocketDisconnect.bind(this),
      this.initSocketRightsChange = this.initSocketRightsChange.bind(this),
      this.initSocketRoomProject = this.initSocketRoomProject.bind(this),
      this.initEventListener = this.initEventListener.bind(this),
      this.blocklyEvents = this.blocklyEvents.bind(this),
      this.aceEvents = this.aceEvents.bind(this),
      this.createMarker = this.createMarker.bind(this),
      this.createAceMarker = this.createAceMarker.bind(this),
      this.createAceSelection = this.createAceSelection.bind(this)
    this.initSocketuserRightsChange = this.initSocketuserRightsChange.bind(this)
    this.initSocketRoomProjectUpdated = this.initSocketRoomProjectUpdated.bind(this)
    this.initSocketReconnect = this.initSocketReconnect.bind(this)
    this.initSocketSharedUserAddedError = this.initSocketSharedUserAddedError.bind(this)
  }
  async init() {
    pseudoModal.openModal('modal-warning-rtc-autosave');
    let signedLink;
    if (!UserManager.getUser()) {
      if (!([1, 2].includes(projectManager.getCurrentProject().sharedStatus))) {
        return;
      }
      signedLink = await projectManager.ajax_getSignedLink(projectManager.getCurrentProject().link);
    }
    try {
      //this.socket = io('https://vittascience-rtc.com:443/', {
      //this.socket = io('https://vitta-rtc-test.ovh:3000/', {
      this.socket = io('https://vittascience-rtc.com:443/', {
        query: {
          clientInfos: (UserManager.getUser() != null) ? JSON.stringify({ name: UserManager.getUser().firstname + ' ' + UserManager.getUser().surname, icon: UserManager.getUser().picture }) : JSON.stringify(this.professionArray[Math.floor(Math.random() * 27)]),
          room: getParamValue('link'),
          token: UserManager.getUser() != null ? UserManager.getUser().token : null,
          signedLink: typeof signedLink != 'undefined' ? signedLink : null
        }
      });
    } catch (error) {
      console.error(error)
    }
    this.workspace = CodeManager.getSharedInstance()._workspace;
    this.aceEditor = Main.getCodeEditor().container;
    this.curMgr = new AceMultiCursorManager(this.aceEditor.getSession());
    this.aceRange = require('ace/range').Range;
    this.selMgr = new AceMultiSelectionManager(this.aceEditor.getSession());
    this.initSaveWarning();
    this.initSocketUsers()
    this.initSocketDisconnect()
    this.initSocketRoomProject()
    this.initSocketRoomProjectUpdated()
    this.initSocketBlockly()
    this.initSocketAce()
    this.initSocketSave()
    this.initSocketRightsChange()
    this.initSocketuserRightsChange()
    this.initEventListener()
    this.initSocketReconnect()
    this.initSocketSharedUserAddedError()
  }
  initSaveWarning() {
    document.getElementById("ide-content").style.position = "relative";
    let divWarning = document.createElement("div");
    divWarning.setAttribute("id", "save-warning");
    let divWarningText = document.createElement("span");
    divWarningText.setAttribute("id", "save-warning-text");
    divWarning.appendChild(divWarningText);
    document.getElementById("ide-content").appendChild(divWarning);
  }
  initSocketUsers() {
    this.socket.on('users', (data) => {
      //let divInterval = null;
      let userDiv = document.getElementById('users');
      let userDivOnline = document.getElementById('users-anonymous-online');
      let modalUsersOnlineDiv = document.getElementById('users-anonymous-online-modal');
      userDiv.innerHTML = '';
      userDivOnline.innerHTML = '';
      userDivOnline.innerHTML = `<span data-i18n="modals.standard.rtc.userOwner.usersNowOnline" class="d-block mb-2">Utilisateurs actuellement en ligne :</span>`;
      modalUsersOnlineDiv.innerHTML = '';
      Array.from(document.querySelectorAll('.round-online-green')).map(x => x.classList.remove('round-online-green'));
      this.curMgr.removeAll();
      this.selMgr.removeAll();
      let zIndex = 100;
      let sharedUsersList = null;
      if (projectManager._currentProject.sharedUsers != null) {
        if (projectManager._currentProject.sharedUsers.length > 0) {
          sharedUsersList = JSON.parse(projectManager._currentProject.sharedUsers)
        }
      }
      for (let element in data) {
        if (sharedUsersList != null) {
          for (let item in sharedUsersList) {
            if (sharedUsersList[item].userId == data[element].vittaId) {
              Array.from($('[data-idRound="round-online-' + sharedUsersList[item].userId + '"]')).map(x => x.classList.add('round-online-green'));
            }
          }
        }
        let userRound = document.createElement('div');
        userRound.className = 'user-round';
        userRound.setAttribute('data-bs-toggle', 'tooltip');
        userRound.setAttribute('data-bs-placement', 'bottom');
        userRound.setAttribute('data-bs-title', i18next.t(JSON.parse(data[element].clientInfos).name));
        let tooltip = new bootstrap.Tooltip(userRound);
        userRound.style.setProperty('--user-color', data[element].color);
        let userRoundText = document.createElement('span');
        if (JSON.parse(data[element].clientInfos).icon == null || JSON.parse(data[element].clientInfos).icon == '') {
          userRoundText.className = 'user-round-text';
          userRoundText.innerHTML = JSON.parse(data[element].clientInfos).name.charAt(0);
          userRound.appendChild(userRoundText);
        } else {
          let userRoundImg = document.createElement('img');
          if (JSON.parse(data[element].clientInfos).icon.startsWith('Icon-')) {
            userRoundImg.className = 'user-round-icon';
            userRoundImg.src = '/openInterface/interfaces/assets/media/users-icons/' + JSON.parse(data[element].clientInfos).icon;
          } else {
            userRoundImg.className = 'user-round-picture';
            userRoundImg.src = `${CDN_PATH}/public/content/user_data/user_img/${JSON.parse(data[element].clientInfos).icon}`;
          }
          userRound.appendChild(userRoundImg);
        }
        let userNameText = document.createElement('span');
        userNameText.innerHTML = i18next.t(JSON.parse(data[element].clientInfos).name)
        let userDivOnlineLine = document.createElement("div");
        userDivOnlineLine.className = "user-online-line";
        userDivOnlineLine.append(userRound.cloneNode(true));
        userDivOnlineLine.append(userNameText.cloneNode(true));
        if (data[element].socketId == this.socket.id) {
          userRound.style.zIndex = 100;
          userDivOnlineLine.querySelector('.user-round + span').innerHTML += ' ' + i18next.t('tutorial.commentary.you');
          userRound.setAttribute('title', i18next.t(JSON.parse(data[element].clientInfos).name) + ' ' + i18next.t('tutorial.commentary.you'));
          //userRound.classList.add('user-you');
          userDiv.prepend(userRound);
          modalUsersOnlineDiv.prepend(userDivOnlineLine.cloneNode(true));
          if (data[element].readOnly == 1) {
            this.divInterval = setInterval(function () {
              Main.setOptionForEditor("readOnly", true);
              if (document.getElementById('blockly-readonly') == null) {
                let divBlocklyReadOnly = document.createElement('div');
                divBlocklyReadOnly.id = 'blockly-readonly';
                $('#content_blocks').prepend(divBlocklyReadOnly);
              } else {
                document.getElementById('blockly-readonly').className = '';
                document.getElementById('blockly-readonly').className = 'blockly-readonly';
              }
              $(".blocklyToolboxDiv").hide();
            }, 10);
          } else {
            if (this.divInterval != null) {
              clearInterval(this.divInterval);
              this.divInterval = null;
              if (document.getElementById('blockly-readonly') != null) {
                document.getElementById('blockly-readonly').remove();
              }
            }
            $(".blocklyToolboxDiv").show();
            if (getParamValue('mode') == 'code') {
              Main.setOptionForEditor("readOnly", false);
            }
          }
        } else {
          modalUsersOnlineDiv.append(userDivOnlineLine.cloneNode(true));
          userRound.style.zIndex = zIndex + 1;
          userRound.style.marginLeft = '-10px';
          userDiv.append(userRound);
        }
        userDivOnline.append(userDivOnlineLine);
        zIndex++;
      }
      if (userDiv.childElementCount > 3) {
        let nbUsersMore = userDiv.childElementCount - 2;
        for (let index = userDiv.childElementCount; index > 1; index--) {
          if (index > 2) {
            document.querySelector('#users :nth-child(' + (index) + ')').remove();
          }
        }
        let userRoundMore = document.createElement('div');
        userRoundMore.className = 'user-round';
        userRoundMore.id = 'user-round-more-bubble';

        userRoundMore.style.marginLeft = '-10px';
        userRoundMore.style.zIndex = 110;
        let userRoundMoreText = document.createElement('span');
        userRoundMoreText.className = 'user-round-text';
        userRoundMoreText.innerHTML = '+' + nbUsersMore;
        userRoundMore.appendChild(userRoundMoreText);
        userDiv.append(userRoundMore);
      }
    });
  }
  initSocketBlockly() {
    this.socket.on('blockly', (data) => {
      //CodeManager.getSharedInstance()._workspace.removeChangeListener(this.blocklyEvents);
      //Blockly.Events.disable()
      Blockly.Events.disabled_ = 1;
      if (data.socketId != this.socket.id) {
        if (data.event.type == 'selected') {
          this.createMarker(data)
        } else {
          let currentSelected = document.querySelector(".blocklySelected");
          let blockId = null;
          if (currentSelected != null) {
            blockId = currentSelected.getAttribute('data-id');
          }
          CodeManager.getSharedInstance().loadBlocks(data.xml)
          if (data.event.type == 'move') {
            data.event.newElementId = data.event.blockId;
            data.event.oldElementId = null;
            this.createMarker(data);
          }
          if (blockId != null) {
            CodeManager.getSharedInstance()._workspace.getBlockById(blockId).select();
          }
        }
      }
      setTimeout(() => {
        Blockly.Events.disabled_ = 0;
      }, 0);
    });
  }
  initSocketAce() {
    this.socket.on('ace', (data) => {
      if (getParamValue('mode') == 'code' || Main.hasPython2Blocks()) {
        this.aceEditor.removeEventListener('change', this.aceEvents);
        this.aceEditor.selection.removeEventListener("changeCursor", this.aceEvents);
        this.aceEditor.selection.removeEventListener("changeSelection", this.aceEvents);
        if (data.socketId != this.socket.id) {
          if (data.event == 'cursor') {
            this.createAceMarker(data)
          } else if (data.event == 'selection') {
            this.createAceSelection(data)
          } else {
            let myCursor = this.aceEditor.getCursorPosition();
            this.aceEditor.getSession().setValue(data.code, 1);
            this.aceEditor.selection.moveTo(myCursor.row, myCursor.column)
          }
          this.aceTriggerTrad();

        }
        setTimeout(() => {
          this.aceEditor.addEventListener('change', this.aceEvents);
          this.aceEditor.selection.on("changeCursor", this.aceEvents);
          this.aceEditor.selection.on("changeSelection", this.aceEvents);
        }, 0);
      } else {
        if (data.event == 'change') {
          projectManager._currentProject.codeText = data.code;
          CodeManager.getSharedInstance().setTextCode(data.code)
        }
      }
    });
  }
  initSocketSave() {
    this.socket.on('save', (data) => {
      if (data.status == 'progress') {
        $("#project-is-saved").css('color', 'var(--vitta-orange)').html('<i class="fas fa-save"></i>');
        document.getElementById('save-warning').style.backgroundColor = 'var(--vitta-orange-light)';
        document.getElementById("save-warning-text").innerHTML = '<i class="fas fa-save"></i> ' + data.message;
        $("#save-warning").fadeIn();
        //document.getElementById('save-warning').style.opacity = '1';
      } else if (data.status == 'success') {
        projectManager._currentProject.code = projectManager.localStorageManager.getLocalProjectContent().code;
        projectManager._currentProject.codeText = projectManager.localStorageManager.getLocalProjectContent().codeText;
        $("#project-is-saved").css('color', 'var(--vitta-green)').html('<i class="fas fa-check"></i>');
        document.getElementById('save-warning').style.backgroundColor = 'var(--vitta-green)';
        document.getElementById("save-warning-text").innerHTML = '<i class="fas fa-check"></i> ' + data.message;
        setTimeout(() => {
          $("#save-warning").fadeOut(1000);
          //document.getElementById('save-warning').style.opacity = '0';
        }, 2000);
      } else if (data.status == 'error') {
        $("#project-is-saved").css('color', 'var(--vitta-orange)').html('<i class="fas fa-save"></i>');
        document.getElementById('save-warning').style.backgroundColor = 'var(--vitta-red)';
        document.getElementById("save-warning-text").innerHTML = '<i class="fas fa-exclamation-triangle"></i> ' + data.message;
        setTimeout(() => {
          $("#save-warning").fadeOut(1000);
          //document.getElementById('save-warning').style.opacity = '0';
        }, 2000);
      }
    });
  }
  initSocketRoomProject() {
    this.socket.on('roomProject', (data) => {
      if (data.id == this.socket.id) {
        //Blockly.Events.disable()
        Blockly.Events.disabled_ = 1;
        this.aceEditor.removeEventListener('change', this.aceEvents);
        this.aceEditor.selection.removeEventListener("changeCursor", this.aceEvents);
        this.aceEditor.selection.removeEventListener("changeSelection", this.aceEvents);
        let codeXml = JSON.parse(data.project).code;
        let codeAce = JSON.parse(data.project).codeText;
        projectManager._currentProject = JSON.parse(data.project)
        CodeManager.getSharedInstance().loadBlocks(codeXml)
        CodeManager.getSharedInstance().setTextCode(codeAce);
        setTimeout(() => {
          //Blockly.Events.enable()
          Blockly.Events.disabled_ = 0;
          this.aceEditor.addEventListener('change', this.aceEvents);
          this.aceEditor.selection.on("changeCursor", this.aceEvents);
          this.aceEditor.selection.on("changeSelection", this.aceEvents);
        }, 0);
        this.initEventListener();
      }
    });
  }
  initSocketRoomProjectUpdated() {
    this.socket.on('roomProjectUpdated', (data) => {
      //Blockly.Events.disable()
      Blockly.Events.disabled_ = 1;
      this.aceEditor.removeEventListener('change', this.aceEvents);
      this.aceEditor.selection.removeEventListener("changeCursor", this.aceEvents);
      this.aceEditor.selection.removeEventListener("changeSelection", this.aceEvents);
      let codeXml = JSON.parse(data.project).code;
      let codeAce = JSON.parse(data.project).codeText;
      projectManager._currentProject = JSON.parse(data.project)
      CodeManager.getSharedInstance().loadBlocks(codeXml)
      CodeManager.getSharedInstance().setTextCode(codeAce);
      setTimeout(() => {
        //Blockly.Events.enable()
        Blockly.Events.disabled_ = 0;
        this.aceEditor.addEventListener('change', this.aceEvents);
        this.aceEditor.selection.on("changeCursor", this.aceEvents);
        this.aceEditor.selection.on("changeSelection", this.aceEvents);
      }, 0);
      this.initEventListener();
    });
  }
  initSocketDisconnect() {
    this.socket.on('refused', (data) => {
      openRefusedModal();
    });
  }
  initSocketReconnect() {
    this.socket.on('hasToReconnect', () => {
      console.log('hasToReconnect')
      const tryConnection = () => {
        if (this.socket.connected) {
          setTimeout(() => {
            tryConnection()
          }, 100);
          return
        }

        this.init();
        console.log('hasToReconnect2')
      }
      tryConnection();
    });
  }
  initSocketRightsChange() {
    this.socket.on('rightsChange', (data) => {
      rightsChange(data.rights);
    });
  }
  initSocketuserRightsChange() {
    //io.to(data.room).emit('userRightsChange', {user:data.idUser, rights:data.rights});
    this.socket.on('userRightsChange', (data) => {
      if (UserManager.getUser().id && UserManager.getUser().id == data.user) {
        userRightsChange(data.rights);
      }
    });
  }
  initSocketSharedUserAddedError() {
    this.socket.on('sharedUserAddedError', (data) => {
      const errorNotif = new VittaNotif();
      errorNotif.displayNotification('#email-notification-area', "Erreur lors de l'ajout de la personne au projet", 'bg-danger');
    });
  }

  initEventListener() {
    this.workspace.addChangeListener(this.blocklyEvents);
    this.aceEditor.addEventListener('change', this.aceEvents);
    this.aceEditor.selection.on("changeCursor", this.aceEvents);
    this.aceEditor.selection.on("changeSelection", this.aceEvents);
  }

  blocklyEvents(event) {
    if (this.eventsArray.includes(event.type)) {
      if (event.newElementId == null || CodeManager.getSharedInstance()._workspace.getBlockById(event.newElementId).pathObject.svgPath.style.strokeWidth == "") {
        let ev = event.toJson();
        this.socket.emit('blockly', { room: projectManager.getCurrentProject().link, event: ev, xml: CodeManager.getSharedInstance().getXml() });
      }
    }
  }
  aceEvents(event) {
    if (getParamValue('mode') == 'code' || Main.hasPython2Blocks()) {
      if (event.type == 'changeCursor') {
        let position = this.aceEditor.getCursorPosition();
        this.socket.emit('ace', { room: projectManager.getCurrentProject().link, position: position, event: 'cursor' });
      } else if (event.type == 'changeSelection') {
        let range = this.aceEditor.selection.getRange();
        this.socket.emit('ace', { room: projectManager.getCurrentProject().link, range: range, event: 'selection' });
      } else {
        let value = this.aceEditor.getValue();
        this.socket.emit('ace', { room: projectManager.getCurrentProject().link, code: value, event: 'change' });
      }
    }
  }

  aceTriggerTrad(){
    if (Main.hasPython2Blocks()){
      if (Python2Blocks !== "undefined" && Python2Blocks.initialized === true) {
        Python2Blocks.prepareInjection();
    }
    }
  }

  createMarker(data) {
    /*    if (!CodeManager.getSharedInstance()._workspace.getMarkerManager()) {
         throw Error('Cannot create a Marker without Blockly MarkerManager.');
       };
       let marker = CodeManager.getSharedInstance()._workspace.getMarkerManager().getMarker(data.socketId)
       if(data.event.newElementId != null){
         if (marker == null) {
           marker = new Blockly.Marker();
           marker.colour = data.client.color
           CodeManager.getSharedInstance()._workspace.getMarkerManager().registerMarker(data.socketId, marker);
         }
         const block = CodeManager.getSharedInstance()._workspace.getBlockById(data.event.newElementId)
         let node = Blockly.ASTNode.createBlockNode(block);
         marker.setCurNode(node.prev());
       }else{
         if (marker != null) {
           CodeManager.getSharedInstance()._workspace.getMarkerManager().unregisterMarker(data.socketId);
         }
       }
       return marker; */
    //second way
    let oldSelectedBlock = CodeManager.getSharedInstance()._workspace.getBlockById(data.event.oldElementId)
    /* if(oldSelectedBlock != null){
      if(oldSelectedBlock.pathObject.svgPathSelected_ == null){
        oldSelectedBlock.pathObject.svgPath.style.stroke = '';
        oldSelectedBlock.pathObject.svgPath.style.strokeWidth = '';
        oldSelectedBlock.setDeletable(true);
        oldSelectedBlock.setMovable(true);
        oldSelectedBlock.setEditable(true);
        if(oldSelectedBlock.childBlocks_.length > 0){
          oldSelectedBlock.childBlocks_[0].setDeletable(true);
          oldSelectedBlock.childBlocks_[0].setMovable(true);
          oldSelectedBlock.childBlocks_[0].setEditable(true);
        }
        document.querySelectorAll("[id='"+data.client.socketId+"']")[0].remove();
      }else{ */
    let allLabels = document.querySelectorAll("[id='" + data.client.socketId + "']");
    let allBlocks = CodeManager.getSharedInstance()._workspace.getAllBlocks();
    for (let i = 0; i < allBlocks.length; i++) {
      allBlocks[i].pathObject.svgPath.style.stroke = '';
      allBlocks[i].pathObject.svgPath.style.strokeWidth = '';
      allBlocks[i].setDeletable(true);
      allBlocks[i].setMovable(true);
      allBlocks[i].setEditable(true);
      if (allBlocks[i].childBlocks_.length > 0) {
        allBlocks[i].childBlocks_[0].setDeletable(true);
        allBlocks[i].childBlocks_[0].setMovable(true);
        allBlocks[i].childBlocks_[0].setEditable(true);
      }
    }
    if (allLabels.length > 0) {
      for (let i = 0; i < allLabels.length; i++) {
        allLabels[i].remove();
      }
      /* }
    } */

    }
    if (data.event.newElementId != null) {
      let block = CodeManager.getSharedInstance()._workspace.getBlockById(data.event.newElementId)
      block.pathObject.svgPath.style.stroke = data.client.color;
      block.pathObject.svgPath.style.strokeWidth = '3px';
      block.setDeletable(false);
      block.setMovable(false);
      block.setEditable(false);
      if (block.childBlocks_.length > 0) {
        block.childBlocks_[0].setDeletable(false);
        block.childBlocks_[0].setMovable(false);
        block.childBlocks_[0].setEditable(false);
      }
      let blockWidth = CodeManager.getSharedInstance()._workspace.getBlockById(data.event.newElementId).width // width of the selected block
      let nameLength = i18next.t(JSON.parse(data.client.clientInfos).name).length;
      let labelSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      labelSvg.setAttribute('id', data.client.socketId);
      labelSvg.setAttribute('class', 'labelSelected');
      labelSvg.setAttribute('data-block', data.event.newElementId);
      var textElem = document.createElementNS("http://www.w3.org/2000/svg", 'text');
      textElem.textContent = i18next.t(JSON.parse(data.client.clientInfos).name);
      textElem.setAttribute('x', blockWidth + 14);
      textElem.setAttribute('y', 15);
      textElem.setAttribute('width', nameLength + "ch");
      textElem.setAttribute('height', 20);
      textElem.setAttribute('fill', 'white');
      labelSvg.appendChild(textElem);
      document.querySelectorAll("[data-id='" + data.event.newElementId + "']")[0].append(labelSvg);
      let rectElem = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
      var textWidth = textElem.getComputedTextLength()
      rectElem.setAttribute('x', blockWidth + 10);
      rectElem.setAttribute('y', 0);
      rectElem.setAttribute('rx', 10);
      rectElem.setAttribute('ry', 10);
      rectElem.setAttribute('width', textWidth + 8 + "px");
      rectElem.setAttribute('height', 20);
      rectElem.setAttribute('fill', data.client.color);
      document.getElementById(data.client.socketId).prepend(rectElem);
    }
    return true;
  };
  createAceMarker(data) {
    let cursor = this.curMgr._getCursor(data.socketId);
    if (cursor == false) {
      this.curMgr.addCursor(data.socketId, i18next.t(JSON.parse(data.client.clientInfos).name), data.client.color, data.position);
    }
    this.curMgr.setCursor(data.socketId, data.position);
  }
  createAceSelection(data) {
    let selection = new this.aceRange(data.range.start.row, data.range.start.column, data.range.end.row, data.range.end.column);
    let range = this.selMgr._getSelection(data.socketId);
    if (range == false) {
      this.selMgr.addSelection(data.socketId, i18next.t(JSON.parse(data.client.clientInfos).name), data.client.color, selection);
    }
    this.selMgr.setSelection(data.socketId, selection);
  }
}

/* let rtcInterval = setInterval(() => {
  if(projectManager != null){
    if (projectManager._currentProject.hasOwnProperty('link')) {
      if (getParamValue('link') != null) {
        clearInterval(rtcInterval);
        const rtcInstance = new RtcManager();
        rtcInstance.init();
      }
    } 
  }
}, 100); */
