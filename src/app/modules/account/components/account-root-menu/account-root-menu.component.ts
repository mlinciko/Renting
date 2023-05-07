import { Component, OnInit } from '@angular/core';
import { faChevronRight, faPen, faStar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { IUser } from 'src/app/models/models';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from 'src/app/services/user.service';
import { MENU_ITEMS } from '../../models/menu-items';
import { AccountService } from '../../services/account.service';
import { IMenuItem } from '../../models/menu-item.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-root-menu',
  templateUrl: './account-root-menu.component.html',
  styleUrls: ['./account-root-menu.component.scss']
})
export class AccountRootMenuComponent implements OnInit {
  user!: IUser;
  noImageIcon = faUserCircle;
  arrowIcon = faChevronRight;
  editIcon = faPen;
  starIcon = faStar;
  menuItems = MENU_ITEMS;

  avatarDialog: boolean = false;
  constructor(
    private userService: UserService,
    private imageService: ImageService,
    private auth: AuthService, 
    private account: AccountService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userService.user.subscribe(
      (user: IUser) => {
        this.user = user;
      }
    )

    this.menuItems.forEach((item) => {
      if (item.path) {
        const activeItem = this.router.url.includes(item.path)
        if (activeItem) {
          this.selectMenuItem(item);
        }
      }
      
      return item;
    })
  }

  getUserImage(imagePath: string): string {
    return this.imageService.getFullImagePath(imagePath);
  }

  selectMenuItem(item: IMenuItem): void {
    this.account.activeMenuItem.next(item);
  }

  logoutUser(): void {
    this.auth.logout();
    this.userService.unsetUser();
  }

  enableDarkMode(): void {

  }

  loadAvatar(): void {
    this.avatarDialog = true;
  }

  closeLoadAvatar(): void {
    this.avatarDialog = false;
  }

}
