import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Role } from '@shared/models/enum/role';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-type',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
  templateUrl: './user-type.component.html',
  styleUrl: './user-type.component.css',
})
export class UserTypeComponent {
  @Input() onSubmit!: () => void;
  @Output() onSubmitted = new EventEmitter<Role>();

  userType: Role | null = null;

  public Role = Role;

  submit() {
    if (this.userType === null) {
      alert('Please select your type of profile!');
      return;
    }

    console.log('User Type Submitted');
    this.onSubmitted.emit(this.userType);
    this.onSubmit();
  }

  selectUserType(userType: Role) {
    this.userType = userType;
  }
}
