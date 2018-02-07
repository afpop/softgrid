angular.module('softgrid.directive').run(['$templateCache', function($templateCache) {$templateCache.put('softgrid.html','\n<div class="softgrid-display" ng-class="{\'softgrid-display-fullscreen\': softgrid.fullscreen}" ng-style="sgControls.fullscreen && softgrid.fullscreen ? { \'z-index\': sgControls.fullscreen.zindex, \'top\': sgControls.fullscreen.top + \'px\'} : \'\'">\n\n    <div class="grid-controles" ng-style="sgControls.fullscreen && softgrid.fullscreen ? { \'z-index\': (sgControls.fullscreen.zindex + 1), \'top\': (sgControls.fullscreen.top) + \'px\'} : \'\'">\n\n        <div class="row" ng-hide="hide.all">\n\n            <div class="col-md-2">\n\n                <div ng-hide="hide.filter || hide.all">\n\n                    <label>Filtrar</label>\n\n                    <div class="input-group">\n\n                        <div class="input-group-btn">\n\n                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="fa fa-search"></span></button>\n\n                            <ul class="dropdown-menu dropdown-menu-left">\n\n                                <li ng-repeat="col in cols track by $index">\n\n                                    <a ng-click="sg_checkCol(col, $event)"> <input type="checkbox" ng-checked="col.checked" ng-click="sg_checkCol(col, $event)" /> {{col.title}} </a>\n\n                                </li>\n\n                            </ul>\n\n                        </div>\n\n                        <input type="text" class="form-control" ng-model="sg_filter" placeholder="Palavra-chave" aria-describedby="filtro-addon">\n\n                    </div>\n\n                </div>\n\n            </div>\n\n            <div class="col-md-6">\n\n                <div class="row">\n\n                    <div class="col-md-4">\n                        <div class="form-group" ng-hide="hide.linesPage || hide.all || hide.pagination" style="margin-bottom: 0;">\n\n                            <label>Linhas por p\xE1gina</label>\n\n                            <div class="input-group" style="width: 120px;">\n\n                        <span class="input-group-btn">\n                            <button class="btn btn-default" type="button" ng-click="sg_changeLinesPerPage(-1)">-</button>\n                        </span>\n\n                                <input class="form-control" ng-model="sg_linesPerPageInput">\n\n                                <span class="input-group-btn">\n\t\t\t\t\t\t\t<button class="btn btn-default" type="button" ng-click="sg_changeLinesPerPage(1)">+</button>\n\t\t\t\t\t\t</span>\n\n                            </div>\n\n                        </div>\n\n                    </div>\n\n                    <div class="col-md-4">\n\n                        <div ng-hide="hide.options || hide.all">\n\n                            <label>Op\xE7\xF5es</label>\n\n                            <div class="input-group">\n                                <input type="text" class="form-control" aria-label="..." value="{{data.length}} encontrado(s)" disabled="true">\n                                <div class="input-group-btn">\n                                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="fa fa-bars"></span></button>\n                                    <ul class="dropdown-menu dropdown-menu-right">\n                                        <li ng-repeat="item in sgMenu">\n                                            <a ng-click="item.function()"><span class="{{item.icon}}"></span> {{item.title}}</a>\n                                        </li>\n                                        <li role="separator" class="divider" ng-show="sgMenu"></li>\n                                        <li ng-if="sgControls.select"><a ng-click="sg_selectAll()"><span class="fa fa-check"></span> Selecionar Todos</a></li>\n                                        <li><a ng-click="softGridToExcel()"><span class="fa fa-file-excel-o"></span> Gerar Excel</a></li>\n                                    </ul>\n                                </div>\n                            </div>\n\n                            <div ng-if="!subgrid">\n                                <a href="#" ng-show="false"  id="softDownload"></a>\n                            </div>\n\n                        </div>\n\n                    </div>\n\n                    <div class="col-md-4">\n\n                        <div ng-hide="hide.fullscreen || hide.all">\n\n                            <label>&nbsp;</label><br>\n                            <button class="btn btn-default" ng-click="softgrid.fullscreen = softgrid.fullscreen ? false : true"><span class="fa fa-expand" ng-class="{\'fa-compress\': softgrid.fullscreen}"></span>\n\n                                {{ softgrid.fullscreen ? (sgControls.fullscreen.on ? sgControls.fullscreen.on : \'Tela normal\') : (sgControls.fullscreen.off ? sgControls.fullscreen.off : \'Tela cheia\') }}\n\n                            </button>\n\n                        </div>\n\n                    </div>\n\n                </div>\n\n            </div>\n\n            <div class="col-md-4">\n\n                <nav aria-label="Page navigation" class="pull-right" ng-hide="hide.pagination || hide.all">\n\n                    <label>Pagina\xE7\xE3o</label>\n\n                        <ul class="pagination">\n\n                            <li ng-repeat="soft_page in soft_pages" ng-class="{\'active\': soft_page.active}">\n                                <a ng-click="sg_changePage(soft_page.value)" ng-bind-html="soft_page.text"></a>\n                            </li>\n\n                        </ul>\n\n                </nav>\n\n            </div>\n\n        </div>\n\n    </div>\n\n    <div class="row">\n\n        <div class="col-md-12">\n\n                <div class="softgrid-container">\n\n                    <div ng-style=" width ? { \'width\': width + \'px\' } : { \'width\': \'100%\' }">\n\n                        <table ng-attr-id="{{!subgrid ? \'none\': \'softgrid\'}}" class="softgrid {{template}}" >\n\n                            <thead>\n\n                                <!-- Cabecalho para Checkbox -->\n                                <th ng-show="sgControls.checkBox" style="text-align: center;">\n\n                                    <input type="checkbox" ng-checked="sg_checked" ng-click="sg_checkAll()">\n\n                                </th>\n\n                                <!-- Cabecalho para Menu -->\n                                <th ng-show="actions.length > 0 || subgrid">\n\n                                </th>\n\n                                <!-- Cabecalho para A\xE7\xF5es -->\n\t\t\t\t\t\t\t\t<th ng-show="sgControls.create || sgControls.read || sgControls.update || sgControls.delete" style="text-align: center;">\n\t\t\t\t\t\t\t\t\tA\xE7\xF5es\n\t\t\t\t\t\t\t\t</th>\n\n                                <!-- Cabecalho para colunas da grid -->\n                                <th ng-repeat="col in cols track by $index" ng-show="!col.hide" style="text-align:center;">\n\n                                  <span class="title" ng-click="sg_sort(col, $index)">\n\n\t\t\t\t\t\t\t\t\t  {{col.title}}\n\n\t\t\t\t\t\t\t\t\t  <span ng-show="$index === sg_orderByColIndex" class="fa fa-sort-amount-asc" ng-class="{\'fa-sort-amount-desc\' : reverse}"></span>\n\n\t\t\t\t\t\t\t\t  </span>\n\n                                </th>\n\n                                <!-- Cabecalho para ativo -->\n\t\t\t\t\t\t\t\t<th ng-show="sgControls.active" style="text-align: center;">\n\t\t\t\t\t\t\t\t\t{{sgControls.activeTitle}}\n\t\t\t\t\t\t\t\t</th>\n\n                                <!-- Cabecalho para Favorito -->\n                                <th ng-if="sgControls.favorite" style="text-align: center;">\n\n                                    {{sgControls.favorite.title ? sgControls.favorite.title : \'Favorito\'}}\n\n                                </th>\n\n                                <!-- Cabecalho para Progresso -->\n                                <th ng-if="sgControls.progress" style="text-align: center;">\n\n                                    {{sgControls.progress.title ? sgControls.progress.title : \'Progresso\'}}\n\n                                </th>\n\n                                <!-- Cabecalho para Aprovacao -->\n                                <th ng-if="sgControls.approve && sgControls.approve.showCol" style="text-align: center;">\n\n                                    Aprova\xE7\xE3o\n\n                                </th>\n\n                            </thead>\n\n                            <tbody>\n\n                                <tr ng-init="$last ? sg_hook() : angular.noop()" ng-class="{\'soft-row-striped\': ($index%2)}" ng-repeat-start="row in filteredData | limitTo: sg_linesPerPage : ((sg_currentPage * sg_linesPerPage) - sg_linesPerPage) track by $index" ng-style="sgControls.changeRowColor(row) === true && {\'background-color\': (sgControls.rowColor ? sgControls.rowColor :\'#e59482\')}" >\n\n                                    <!-- Coluna para Checkbox -->\n                                    <td ng-show="sgControls.checkBox" style="text-align: center; width: 50px;">\n\n                                        <input type="checkbox" ng-checked="row[sgControls.checkBox.item]" ng-click="sgControls.checkBox.function(row)">\n\n                                    </td>\n\n                                    <!-- Coluna para Menu -->\n                                    <td ng-show="subgrid || actions.length > 0" style="text-align:center; width: {{larguraColunaAcoes}}px">\n\n                                        <div ng-show="sgControls.showAction ? sgControls.showAction(row) : true">\n\n                                                <!-- bot\xE3o para exibir sub tabela -->\n                                                <button ng-show="subgrid" type="button" class="btn btn-default btn-sm btn-subgrid" ng-click="showSubGrid = showSubGrid ? false : true" style="float: left;">\n                                                    <span class="fa fa-expand" ng-class="{\'fa-compress\': showSubGrid}"></span>\n                                                </button>\n\n                                                <div class="dropdown" ng-show="actions">\n\n                                                    <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n                                                        <span class="fa fa-bars"></span>\n                                                    </button>\n\n                                                    <ul class="dropdown-menu dropdown-menu-left">\n\n                                                        <li ng-repeat="action in actions" ng-show="action.show ? action.show(row) : true">\n\n                                                            <a ng-click="action.function(row)"><span class="{{action.icon}}"></span> {{action.title}}</a>\n\n                                                        </li>\n\n                                                    </ul>\n\n                                                </div>\n\n                                        </div>\n\n                                    </td>\n\n\t\t\t\t\t\t\t\t\t<!-- Coluna para A\xE7\xF5es -->\n\t\t\t\t\t\t\t\t\t<td ng-if="sgControls.create || sgControls.read || sgControls.update || sgControls.delete" style="text-align:center; width: {{larguraColunaControles}}px">\n\n\n\t\t\t\t\t\t\t\t\t\t<button ng-show="sgControls.create" type="button" class="btn btn-default btn-sm" ng-click="sgControls.create.action(row)" title="{{ sgControls.create.title ? sgControls.create.title : \'Criar\' }}">\n\t\t\t\t\t\t\t\t\t\t\t<span class="fa" ng-class="sgControls.create.icon ? sgControls.create.icon : \'fa-plus\'"></span>\n\t\t\t\t\t\t\t\t\t\t</button>\n\n\t\t\t\t\t\t\t\t\t\t<button ng-show="sgControls.read" type="button" class="btn btn-default btn-sm"   ng-click="sgControls.read.action(row)" title="{{ sgControls.read.title ? sgControls.read.title : \'Ver\' }}">\n\t\t\t\t\t\t\t\t\t\t\t<span class="fa fa-search"></span>\n\t\t\t\t\t\t\t\t\t\t</button>\n\n\t\t\t\t\t\t\t\t\t\t<button ng-show="sgControls.update" type="button" class="btn btn-default btn-sm" ng-click="sgControls.update.action(row)" title="{{ sgControls.update.title ? sgControls.update.title : \'Atualizar\' }}">\n\t\t\t\t\t\t\t\t\t\t\t<span class="fa fa-pencil"></span>\n\t\t\t\t\t\t\t\t\t\t</button>\n\n\t\t\t\t\t\t\t\t\t\t<button ng-show="sgControls.delete" type="button" class="btn btn-default btn-sm" ng-click="sgControls.delete.action(row)" title="{{ sgControls.delete.title ? sgControls.delete.title : \'Deletar\' }}">\n\t\t\t\t\t\t\t\t\t\t\t<span class="fa fa-trash"></span>\n\t\t\t\t\t\t\t\t\t\t</button>\n\n\t\t\t\t\t\t\t\t\t</td>\n\n                                    <!-- Colunas da grid-->\n                                    <td ng-repeat="col in cols track by $index" ng-init="$parent.editing = false" class="opafion">\n\n                                        <input ng-show="editing" ng-init="newvalue = col.item(row)" class="edit-input" ng-model="newvalue" ng-blur="sg_edit(row, col, newvalue, this)" style="width: {{col.edit.width}};">\n\n                                        <div ng-show="!editing" ng-dblclick="sg_openEdit(this, $event)" ng-style="col.align ? { \'text-align\': col.align} : { \'text-align\': \'left\' }">\n\n                                            <label ng-bind-html="sg_mask(col.type, (col.item(row) | limitTo: (col.maxLength ? col.maxLength : 999)))" style="width: 100%;">\n\n                                            </label>\n\n                                            <!--<label style="text-decoration: underline; cursor: pointer" ng-show="col.popOver"   popover data-toggle="popover" data-trigger="hover" data-content="{{col.item(row)}}">{{(col.item(row) | limitTo: (col.maxLength ? col.maxLength : 999))}}</label>-->\n\n                                        </div>\n\n                                    </td>\n\n\t\t\t\t\t\t\t\t\t<!-- Coluna para ativo -->\n\t\t\t\t\t\t\t\t\t<td style="text-align: center;" ng-show="sgControls.active">\n\n\t\t\t\t\t\t\t\t\t\t<label class="switch">\n\n\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" ng-checked="sgControls.activeCol(row)" ng-click="sgControls.activeFunction(row)">\n\n\t\t\t\t\t\t\t\t\t\t\t<div class="slider round"></div>\n\n\t\t\t\t\t\t\t\t\t\t</label>\n\n\t\t\t\t\t\t\t\t\t</td>\n\n                                    <!-- Coluna para favoritos -->\n                                    <td ng-if="sgControls.favorite" style="text-align: center; width: 50px;">\n\n                                        <span ng-show="sgControls.favorite.show(row)" class="fa fa-star" ng-class="{\'active\': sgControls.favorite.item(row)}" ng-click="sgControls.favorite.function(row)"></span>\n\n                                    </td>\n\n                                    <!-- Coluna para progresso -->\n                                    <td ng-if="sgControls.progress" style="text-align: center; width: 50px;">\n\n                                        <div class="progress">\n\n                                            <div class="progress-bar {{sgControls.progress.class ? sgControls.progress.class(row) : \'\'}}" role="progressbar" style="width: {{sgControls.progress.item(row)}}%;">\n                                                {{sgControls.progress.item(row)}}%\n                                            </div>\n\n                                        </div>\n\n                                    </td>\n\n                                    <!-- Coluna para Aprovacao -->\n                                    <td ng-if="sgControls.approve && sgControls.approve.showCol" style="text-align: center; width: 120px;">\n\n                                        <div ng-if="sgControls.approve.show(row)">\n\n                                            <button title="Aprovar" class="btn btn-default btn-sm" ng-click="sgControls.approve.callback(row, true)"><span class="fa fa-thumbs-up"></span></button>\n\n                                            <button title="Reprovar" class="btn btn-default btn-sm" ng-click="sgControls.approve.callback(row, false)"><span class="fa fa-thumbs-down"></span></button>\n\n                                        </div>\n\n                                    </td>\n\n                                </tr>\n\n                                <tr ng-repeat-end="" ng-show="subgrid" ng-hide="!showSubGrid" ng-class="{\'soft-row-striped\': ($index%2)}"> <!-- Linha para Subtabela -->\n\n                                    <td colspan="{{cols.length + 3}}">\n\n                                        <div class="soft-subgrid-container">\n\n                                            <div ng-if="subgrid">\n\n                                                <softgrid  cols="subgrid.cols" actions="subgrid.actions" data="subgrid.object ? row[subgrid.object] : subgrid.item(row)" hide="subgrid.hide" template="\'soft-subgrid\'" sg-controls="subgrid.controls" subgrid="subgrid.subgrid"></softgrid>\n\n                                            </div>\n\n                                        </div>\n\n                                    </td>\n\n                                </tr>\n\n                                <!-- Exibe uma linha caso n\xE3o haja dados -->\n                                <tr ng-show="!data || data.length <= 0" style="text-align: center;">\n\n                                    <td colspan="{{cols.length + 3}} ">\n                                    N\xE3o h\xE1 dados a serem exibidos.\n                                    </td>\n\n                                </tr>\n\n                            </tbody>\n\n                        </table>\n\n                    </div>\n\n                </div>\n\n        </div>\n\n    </div>\n\n    <div class="row" ng-hide="hide.pagination || hide.all">\n\n        <div class="col-md-12">\n\n            <nav aria-label="...">\n                <ul class="pager" style="margin-top: 5px;">\n                    <li class="previous"><button class="btn btn-default pull-left" ng-click="sg_changePage(-1)"><span aria-hidden="true">&larr;</span> P\xE1gina anterior</button></li>\n                    <li class="next"><button class="btn btn-default pull-right" ng-click="sg_changePage(0)">Pr\xF3xima p\xE1gina <span aria-hidden="true">&rarr;</span></button></li>\n                </ul>\n            </nav>\n\n        </div>\n\n    </div>\n\n</div>\n\n');}]);